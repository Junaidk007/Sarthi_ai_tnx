import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    query: {
      type: String,
      required: [true, "Query is required"],
      trim: true,
    },
    taskType: {
      type: String,
      default: "research",
    },
    plan: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    analysis: {
      type: String,
      default: "",
    },
    recommendations: {
      type: String,
      default: "",
    },
    report: {
      type: String,
      required: [true, "Report content is required"],
    },
    sources: [
      {
        title: String,
        url: String,
        content: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model("Report", reportSchema);
