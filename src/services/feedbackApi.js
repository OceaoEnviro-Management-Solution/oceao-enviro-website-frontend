// feedbackApi.js — Mock API service for the Feedback & Complaint page.
// Phase 1: Simulates email sending with realistic delay.
// Phase 2: Replace submitFeedback with a real fetch/axios call. Nothing else changes.

import { mockFeedbackSubmissions } from '../constants/feedbackMockData';

// Simulate network + email-sending latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const feedbackApi = {

  // ── submitFeedback ───────────────────────────────────────────────────────────
  // Simulates sending feedback email and returning a confirmation.
  // Returns: { success, submissionId, message, confirmationEmail, submittedData }
  submitFeedback: async (feedbackData) => {
    await delay(1200); // Simulate network + email sending

    // Generate unique submission ID
    const submissionId = 'FB' + Date.now();

    // Store in mock in-memory database
    mockFeedbackSubmissions[submissionId] = {
      id: submissionId,
      ...feedbackData,
      createdAt: new Date().toISOString(),
      status: 'sent'
    };

    // Dev helper — log submission for verification during testing
    console.log('[DEV] Mock feedback submission:', mockFeedbackSubmissions[submissionId]);

    // Return confirmation payload (simulates successful email dispatch)
    return {
      success: true,
      submissionId,
      message: 'Feedback submitted successfully',
      confirmationEmail: feedbackData.email,
      submittedData: {
        type: feedbackData.type,
        name: feedbackData.name,
        email: feedbackData.email,
        phone: feedbackData.phone || null,
        subject: feedbackData.subject,
        message: feedbackData.message,
        attachmentName: feedbackData.attachment?.name || null
      }
    };
  }
};
