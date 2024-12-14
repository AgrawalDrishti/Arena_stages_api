    const apiBaseUrl = 'http://localhost:3001/api'; // Replace with your API base URL
    let accessToken = ''; // Store the access token after authentication

    // Utility to display API responses
    function displayResponse(data, targetId) {
        const responseContainer = document.getElementById(targetId);
        if (!responseContainer) {
          console.error(`Response container with id "${targetId}" not found.`);
          return;
        }
        responseContainer.textContent = JSON.stringify(data, null, 2);
      }
      

    // Authentication
    document.getElementById('authForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch(`${apiBaseUrl}/auth/login/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        accessToken = data.access_token; // Store the access token
        displayResponse(data, 'authResponse');
      } catch (error) {
        displayResponse({ error: error.message }, 'authResponse');
      }
    });

    // Schedule Stage
    document.getElementById('scheduleStageForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      const stageName = document.getElementById('stageName').value;
      const scheduledTime = document.getElementById('scheduledTime').value;

      try {
        const response = await fetch(`${apiBaseUrl}/stages/schedule/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ stage_name: stageName, time: scheduledTime }),
        });
        const data = await response.json();
        displayResponse(data);
      } catch (error) {
        displayResponse(error.message);
      }
    });

    // Get stages
    // Handle Get Scheduled Stages Form Submission
    document.getElementById('getStagesForm').addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default page reload on form submission

      const hostUserId = document.getElementById('hostUserId').value;
      const limit = document.getElementById('limit').value;
      const offset = document.getElementById('offset').value;

      try {
        const response = await fetch(`${apiBaseUrl}/stages/upcoming/?host_user_id=${hostUserId}&limit=${limit}&offset=${offset}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // Ensure you're authenticated
          },
        });

        const data = await response.json();
        displayScheduledStages(data); // Call a function to display the stages on the frontend
      } catch (error) {
        displayResponse(error.message); // Display any errors in the response section
      }
    });

    // Function to Display Scheduled Stages
    function displayScheduledStages(data) {
      const responseContainer = document.getElementById('response');
      
      if (data.results && data.results.length > 0) {
        // Create an HTML table to display the stages
        let table = '<table border="1" style="width: 100%; border-collapse: collapse;">';
        table += `
          <tr>
            <th>Stage ID</th>
            <th>Stage Name</th>
            <th>Host User ID</th>
            <th>Scheduled Time</th>
            <th>Status</th>
          </tr>
        `;

        data.results.forEach((stage) => {
          table += `
            <tr>
              <td>${stage.stage_id}</td>
              <td>${stage.stage_name}</td>
              <td>${stage.host_user_id}</td>
              <td>${new Date(stage.scheduled_time).toLocaleString()}</td>
              <td>${stage.status}</td>
            </tr>
          `;
        });

        table += '</table>';
        responseContainer.innerHTML = table; // Display the table in the response section
      } else {
        responseContainer.innerHTML = '<p>No stages found.</p>';
      }
    }



// Function to set the access token (called after successful login)
function setAccessToken(token) {
  accessToken = token;
}

// Handle Add Comment Form Submission
document.getElementById('addCommentForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission (page reload)

  const stageId = document.getElementById('commentStageId').value; // Get Stage ID from input
  const content = document.getElementById('content').value; // Get comment content from input

  if (!accessToken) {
    displayResponse({ error: 'Access token is missing. Please log in first.' });
    return;
  }

  try {
    // Send POST request to the API
    const response = await fetch(`${apiBaseUrl}/comments/stage/${stageId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Attach Bearer token
      },
      body: JSON.stringify({ content }), // Request body
    });

    const data = await response.json();

    if (response.ok) {
      displayCommentResponse(data); // Display the response in the UI
    } else {
      displayResponse({ error: data.message || 'Failed to add comment' }); // Display error message
    }
  } catch (error) {
    displayResponse({ error: 'An error occurred. Please try again.' }); // Handle network or other errors
  }
});

// Function to Display the Add Comment Response
function displayCommentResponse(data) {
  const responseContainer = document.getElementById('response');

  // Generate HTML for the comment response
  const html = `
    <h4>Comment Added Successfully</h4>
    <ul>
      <li><strong>Comment ID:</strong> ${data.comment_id}</li>
      <li><strong>Content:</strong> ${data.content}</li>
      <li><strong>User ID:</strong> ${data.user_id}</li>
      <li><strong>Stage ID:</strong> ${data.stage.stage_id}</li>
      <li><strong>Parent Comment ID:</strong> ${data.parentCommentId || 'None'}</li>
      <li><strong>Created At:</strong> ${new Date(data.created_at).toLocaleString()}</li>
    </ul>
  `;

  // Update the Response section with the comment details
  responseContainer.innerHTML = html;
}

// Utility Function to Display Errors or Other Responses
function displayResponse(data) {
  const responseContainer = document.getElementById('response');
  responseContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}


// Handle Like Stage Form Submission
document.getElementById('likeStageForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page reload

  const stageId = document.getElementById('likeStageId').value; // Get Stage ID from input

  if (!accessToken) {
    displayResponse({ error: 'Access token is missing. Please log in first.' });
    return;
  }

  try {
    // Send POST request to like the stage
    const response = await fetch(`${apiBaseUrl}/likes/stage/${stageId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Attach Bearer token
      },
    });

    const data = await response.json();

    if (response.ok) {
      displayLikeResponse(data); // Display the response for the like
    } else {
      displayResponse({ error: data.message || 'Failed to like stage' }); // Display error message
    }
  } catch (error) {
    displayResponse({ error: 'An error occurred. Please try again.' }); // Handle network or other errors
  }
});

// Handle Get Like Count Form Submission
document.getElementById('getLikeCountForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page reload

  const stageId = document.getElementById('likeCountStageId').value; // Get Stage ID from input

  try {
    // Send GET request to fetch like count
    const response = await fetch(`${apiBaseUrl}/likes/stage/${stageId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Attach Bearer token
      },
    });

    const data = await response.json();

    if (response.ok) {
      displayLikeCount(stageId, data); // Display the like count
    } else {
      displayResponse({ error: data.message || 'Failed to fetch like count' }); // Display error message
    }
  } catch (error) {
    displayResponse({ error: 'An error occurred. Please try again.' }); // Handle network or other errors
  }
});

// Function to Display the Like Response
function displayLikeResponse(data) {
  const responseContainer = document.getElementById('response');

  // Generate HTML for the like response
  const html = `
    <h4>Stage Liked Successfully</h4>
    <ul>
      <li><strong>Like ID:</strong> ${data.like_id}</li>
      <li><strong>User ID:</strong> ${data.user_id}</li>
      <li><strong>Stage ID:</strong> ${data.stage.stage_id}</li>
      <li><strong>Stage Name:</strong> ${data.stage.stage_name}</li>
      <li><strong>Scheduled Time:</strong> ${new Date(data.stage.scheduled_time).toLocaleString()}</li>
      <li><strong>Status:</strong> ${data.stage.status}</li>
      <li><strong>Created At:</strong> ${new Date(data.created_at).toLocaleString()}</li>
    </ul>
  `;

  // Update the Response section with the like details
  responseContainer.innerHTML = html;
}

// Function to Display the Like Count
function displayLikeCount(stageId, count) {
  const responseContainer = document.getElementById('response');

  // Generate HTML for the like count
  const html = `
    <h4>Like Count for Stage</h4>
    <p><strong>Stage ID:</strong> ${stageId}</p>
    <p><strong>Total Likes:</strong> ${count}</p>
  `;

  // Update the Response section with the like count
  responseContainer.innerHTML = html;
}

// Utility Function to Display Errors or Other Responses
function displayResponse(data) {
  const responseContainer = document.getElementById('response');
  responseContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

// Handle Repost Stage Form Submission
document.getElementById('repostStageForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page reload

  const stageId = document.getElementById('repostStageId').value; // Get Stage ID from input
  const message = document.getElementById('repostMessage').value; // Get Repost Message (Optional)

  if (!accessToken) {
    displayResponse({ error: 'Access token is missing. Please log in first.' });
    return;
  }

  try {
    // Send POST request to repost the stage
    const response = await fetch(`${apiBaseUrl}/reposts/stage/${stageId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Attach Bearer token
      },
      body: JSON.stringify({ message }), // Optional message in the request body
    });

    const data = await response.json();

    if (response.ok) {
      displayRepostResponse(data); // Display the response for the repost
    } else {
      displayResponse({ error: data.message || 'Failed to repost stage' }); // Display error message
    }
  } catch (error) {
    displayResponse({ error: 'An error occurred. Please try again.' }); // Handle network or other errors
  }
});

// Handle Get Repost Count Form Submission
document.getElementById('getRepostCountForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page reload

  const stageId = document.getElementById('repostCountStageId').value; // Get Stage ID from input

  try {
    // Send GET request to fetch repost count
    const response = await fetch(`${apiBaseUrl}/reposts/stage/${stageId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Attach Bearer token
      },
    });

    const data = await response.json();

    if (response.ok) {
      displayRepostCount(stageId, data); // Display the repost count
    } else {
      displayResponse({ error: data.message || 'Failed to fetch repost count' }); // Display error message
    }
  } catch (error) {
    displayResponse({ error: 'An error occurred. Please try again.' }); // Handle network or other errors
  }
});

// Function to Display the Repost Response
function displayRepostResponse(data) {
  const responseContainer = document.getElementById('response');

  // Generate HTML for the repost response
  const html = `
    <h4>Stage Reposted Successfully</h4>
    <ul>
      <li><strong>Repost ID:</strong> ${data.repost_id}</li>
      <li><strong>User ID:</strong> ${data.user_id}</li>
      <li><strong>Stage ID:</strong> ${data.stage.stage_id}</li>
      <li><strong>Stage Name:</strong> ${data.stage.stage_name}</li>
      <li><strong>Scheduled Time:</strong> ${new Date(data.stage.scheduled_time).toLocaleString()}</li>
      <li><strong>Status:</strong> ${data.stage.status}</li>
      <li><strong>Created At:</strong> ${new Date(data.created_at).toLocaleString()}</li>
    </ul>
  `;

  // Update the Response section with the repost details
  responseContainer.innerHTML = html;
}

// Function to Display the Repost Count
function displayRepostCount(stageId, count) {
  const responseContainer = document.getElementById('response');

  // Generate HTML for the repost count
  const html = `
    <h4>Repost Count for Stage</h4>
    <p><strong>Stage ID:</strong> ${stageId}</p>
    <p><strong>Total Reposts:</strong> ${count}</p>
  `;

  // Update the Response section with the repost count
  responseContainer.innerHTML = html;
}

// Utility Function to Display Errors or Other Responses
function displayResponse(data) {
  const responseContainer = document.getElementById('response');
  responseContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

// Handle Register Device Form Submission
document.getElementById('registerDeviceForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page reload

  const deviceTokenInput = document.getElementById('deviceToken').value; // Get device token input
  const stageId = document.getElementById('stageId').value; // Get stage ID input

  // Use null if the device token input is empty
  const deviceToken = deviceTokenInput.trim() || null;

  if (!accessToken) {
    displayResponse({ error: 'Access token is missing. Please log in first.' });
    return;
  }

  try {
    // Send POST request to register the device
    const response = await fetch(`${apiBaseUrl}/notifications/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Attach Bearer token if required
      },
      body: JSON.stringify({ deviceToken, stage_id: stageId }), // Include the stage ID
    });

    const data = await response.json();

    if (response.ok) {
      displayDeviceRegistrationResponse(data); // Display the response message
    } else {
      displayResponse({ error: data.message || 'Failed to register device for notifications' }); // Display error message
    }
  } catch (error) {
    displayResponse({ error: 'An error occurred. Please try again.' }); // Handle network or other errors
  }
});

// Function to Display the Device Registration Response
function displayDeviceRegistrationResponse(data) {
  const responseContainer = document.getElementById('response');

  // Generate HTML for the registration response
  const html = `
    <h4>Device Registered Successfully</h4>
    <p><strong>Message:</strong> ${data.message}</p>
  `;

  // Update the Response section with the registration message
  responseContainer.innerHTML = html;
}

// Utility Function to Display Errors or Other Responses
function displayResponse(data) {
  const responseContainer = document.getElementById('response');
  responseContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

// Handle Send Notification Form Submission
document.getElementById('sendNotificationForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page reload

  const stageId = document.getElementById('notificationStageId').value; // Get Stage ID from input
  const eventType = document.getElementById('eventType').value; // Get Event Type from input
  const message = document.getElementById('notificationMessage').value; // Get Notification Message from input

  if (!accessToken) {
    displayResponse({ error: 'Access token is missing. Please log in first.' });
    return;
  }

  try {
    // Send POST request to send notifications
    const response = await fetch(`${apiBaseUrl}/notifications/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Attach Bearer token if required
      },
      body: JSON.stringify({
        stage_id: stageId,
        event_type: eventType,
        message: message,
      }), // Request body
    });

    const data = await response.json();

    if (response.ok) {
      displayNotificationResponse(data); // Display the response message
    } else {
      displayResponse({ error: data.message || 'Failed to send notifications' }); // Display error message
    }
  } catch (error) {
    displayResponse({ error: 'An error occurred. Please try again.' }); // Handle network or other errors
  }
});

// Function to Display the Send Notification Response
function displayNotificationResponse(data) {
  const responseContainer = document.getElementById('response');

  // Generate HTML for the notification response
  const html = `
    <h4>Push Notifications Sent</h4>
    <p><strong>Message:</strong> ${data.message}</p>
  `;

  // Update the Response section with the notification message
  responseContainer.innerHTML = html;
}

// Utility Function to Display Errors or Other Responses
function displayResponse(data) {
  const responseContainer = document.getElementById('response');
  responseContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

// Handle Expand Comments Form Submission
document.getElementById('expandCommentsForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page reload

  const stageId = document.getElementById('expandStageId').value; // Get Stage ID
  const parentCommentId = document.getElementById('parentCommentId').value; // Get Parent Comment ID
  const limit = document.getElementById('limit').value; // Get Limit
  const offset = document.getElementById('offset').value; // Get Offset

  if (!accessToken) {
    displayResponse({ error: 'Access token is missing. Please log in first.' });
    return;
  }

  try {
    // Send GET request to expand comments
    const response = await fetch(`${apiBaseUrl}/comments/stage/${stageId}/expand?parent_comment_id=${parentCommentId}&limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Attach Bearer token
      },
    });

    const data = await response.json();

    if (response.ok) {
      displayExpandedComments(data); // Display the expanded comments
    } else {
      displayResponse({ error: data.message || 'Failed to expand comments' }); // Display error
    }
  } catch (error) {
    displayResponse({ error: 'An error occurred. Please try again.' }); // Handle network or other errors
  }
});

// Handle Get Comment Count Form Submission
document.getElementById('getCommentCountForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page reload

  const stageId = document.getElementById('commentCountStageId').value; // Get Stage ID

  if (!accessToken) {
    displayResponse({ error: 'Access token is missing. Please log in first.' });
    return;
  }

  try {
    // Send GET request to get comment count
    const response = await fetch(`${apiBaseUrl}/comments/stage/${stageId}/count`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Attach Bearer token
      },
    });

    const data = await response.json();

    if (response.ok) {
      displayCommentCount(data); // Display the comment count
    } else {
      displayResponse({ error: data.message || 'Failed to fetch comment count' }); // Display error
    }
  } catch (error) {
    displayResponse({ error: 'An error occurred. Please try again.' }); // Handle network or other errors
  }
});

// Function to Display Expanded Comments
function displayExpandedComments(data) {
  const responseContainer = document.getElementById('response');

  // Generate HTML for expanded comments
  const html = `
    <h4>Expanded Comments</h4>
    <p><strong>Parent Comment:</strong> ${data.parent_comment.content}</p>
    <p><strong>Total Comments:</strong> ${data.total_comments}</p>
    <ul>
      ${data.comments
        .map(
          (comment) => `
        <li>
          <strong>Comment ID:</strong> ${comment.comment_id}<br>
          <strong>Content:</strong> ${comment.content}<br>
          <strong>User ID:</strong> ${comment.user_id}<br>
          <strong>Created At:</strong> ${new Date(comment.created_at).toLocaleString()}
        </li>`
        )
        .join('')}
    </ul>
  `;

  // Update the Response section
  responseContainer.innerHTML = html;
}

// Function to Display Comment Count
function displayCommentCount(data) {
  const responseContainer = document.getElementById('response');

  // Generate HTML for comment count
  const html = `
    <h4>Comment Count</h4>
    <p><strong>Stage ID:</strong> ${data.stageId}</p>
    <p><strong>Total Comments:</strong> ${data.totalComments}</p>
  `;

  // Update the Response section
  responseContainer.innerHTML = html;
}

// Utility Function to Display Errors or Other Responses
function displayResponse(data) {
  const responseContainer = document.getElementById('response');
  responseContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

