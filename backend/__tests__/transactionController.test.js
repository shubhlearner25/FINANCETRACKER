const request = require("supertest");
const express = require("express");
const { exportTransactions } = require("../controllers/transactionController");
const IncomeExpense = require("../models/IncomeExpense");
const Papa = require("papaparse");

// Simple mock for the auth middleware — attaches a fake user to the request
const protect = (req, res, next) => {
  req.user = { _id: "user123" }; 
  next();
};

// Create a tiny express app that mounts only the route under test
const app = express();
app.get("/api/transactions/export", protect, exportTransactions);

// Mock out the database model
jest.mock("../models/IncomeExpense");

describe("GET /api/transactions/export", () => {

  // Reset mocks between tests so calls don’t leak across tests
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns a CSV file containing user transactions", async () => {
    const mockTransactions = [
      {
        _id: "t1",
        user: "user123",
        name: "Salary",
        category: "Income",
        cost: 5000,
        addedOn: new Date("2025-09-28T10:00:00Z"),
        isIncome: true,
      },
      {
        _id: "t2",
        user: "user123",
        name: "Groceries",
        category: "Food",
        cost: 1000,
        addedOn: new Date("2025-09-28T12:00:00Z"),
        isIncome: false,
      },
    ];

    // Mock DB result
    IncomeExpense.find.mockReturnValueOnce({
      lean: jest.fn().mockResolvedValue(mockTransactions),
    });

    const res = await request(app).get("/api/transactions/export");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("text/csv");
    expect(res.headers["content-disposition"]).toContain("paisable_transactions.csv");

    // Build CSV based on what the controller should produce
    const expectedCSV = Papa.unparse(
      mockTransactions.map((t) => ({
        id: t._id,
        user: t.user,
        name: t.name,
        category: t.category,
        cost: t.cost,
        addedOn: t.addedOn,
        isIncome: t.isIncome,
      })),
      { header: true }
    );

    expect(res.text.trim()).toBe(expectedCSV.trim());
  });

  it("returns a 500 error if database query fails", async () => {
    IncomeExpense.find.mockReturnValueOnce({
      lean: jest.fn().mockRejectedValue(new Error("DB failure")),
    });

    const res = await request(app).get("/api/transactions/export");

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "Server Error");
    expect(res.body).toHaveProperty("error", "DB failure");
  });
});
