# Answers to Technical Questions

## 1
### How long did you spend on the coding test?
I spent approximately 1 and a half days working on the coding test. This time was spent analyzing the requirements, designing the UI, implementing the features, and testing the app to ensure all functionalities were working properly.

## 2
### What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
We have used `useEffect()` hook which was introduced in React 14. We have primarily used it to update our localstorage when we make any changes to the task.
```jsx
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [tasks]);

```

## 3
### How would you track down a performance issue in production? Have you ever had to do this?
When faced with a performance issue in production, follow this structured approach to efficiently identify and resolve the problem:

### 1. Analyze Metrics
- Use available monitoring tools (e.g., Datadog, New Relic, CloudWatch) to analyze key metrics such as:
  - CPU and memory usage
  - Database query times
  - Network latency
- Identify any abnormalities or spikes.

### 2. Check Logs
- Review application logs for any errors, warnings, or suspicious patterns during the incident timeframe.
- Look for exceptions, slow service calls, or unexpected behavior.

### 3. Reproduce the Issue
- If feasible, replicate the issue in a controlled staging environment to gain a better understanding without impacting users.

### 4. Use Profiling Tools
- Leverage performance profiling tools or tracing mechanisms to drill down into:
  - Slow code paths
  - Database queries
  - External service calls

### 5. Narrow Down the Cause
- Gradually eliminate potential causes to isolate the issue.
- Disable or isolate features and services to identify the root cause.

### 6. Collaborate
- Engage with team members to get different perspectives or help.
- Cross-functional collaboration often speeds up the resolution process.

### 7. Apply and Test Fixes
- Implement fixes or optimizations.
- Test thoroughly in staging before gradually rolling out to production.

### Summary
Addressing production performance issues involves systematic monitoring, investigation, replication, collaboration, and careful testing to ensure a robust resolution.

## 4
### If you had more time, what additional features or improvements would you consider adding to the task management application?
If I had more time, there are a few ideas that would make the task manager even more useful and engaging:

1. **User Accounts and Login**: Adding user accounts would be a big upgrade. With a login system, people could save their tasks across devices and pick up where they left off whenever they return. It would also allow each user to keep their own data private and secure.

2. **Saving Data with a Backend**: I’d connect the app to a backend and database to store tasks persistently. That way, users wouldn’t lose their task lists if they close the app or switch devices. It’d be like having a personalized to-do list that’s always accessible.

3. **Team Collaboration**: It would be awesome to make the app collaborative, so multiple users could share a task list in real-time. Teams could manage shared to-dos or project lists, with live updates so everyone can see what’s happening instantly.

4. **Reminders and Notifications**: I’d add a notification feature so users can set reminders for important tasks. Email or push notifications would help them stay on top of things without constantly checking the app—perfect for people juggling a lot of deadlines.

5. **Tags and Advanced Filters**: Another useful addition would be allowing tags or labels for tasks, like “work,” “personal,” or “high-priority.” Filters based on these tags would make it easier to focus on specific types of tasks.

6. **Enhanced Mobile Experience**: Finally, I’d work on making the app even more mobile-friendly. The idea is to let users manage their tasks easily on any device, whether they’re on a desktop, tablet, or phone.

Overall, these upgrades would turn the task manager into a full-featured, flexible productivity tool that people could rely on for both personal and team projects.
