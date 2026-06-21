const ToDoList = {
  template: `
    <section class="section-card" id="todo">
      <h2>To-Do List</h2>

      <div class="input-group mb-3">
        <input 
          type="text"
          class="form-control"
          placeholder="Enter a new task"
          v-model="newTask"
          @keyup.enter="addTask">

        <button class="btn btn-primary" @click="addTask">
          Add
        </button>
      </div>

      <ul class="list-group">
        <li 
          v-for="(task, index) in tasks"
          :key="index"
          class="list-group-item d-flex justify-content-between align-items-center">

          <span :class="task.priority === 'High' ? 'priority-high' : 'priority-low'">
            {{ task.text }} ({{ task.priority }} Priority)
          </span>

          <div>
            <button 
              class="btn btn-warning btn-sm me-2"
              @click="togglePriority(task)">
              {{ task.priority === 'High' ? 'Mark as Low Priority' : 'Mark as High Priority' }}
            </button>

            <button 
              class="btn btn-danger btn-sm"
              @click="deleteTask(index)">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </section>
  `,

  data() {
    return {
      newTask: "",

      tasks: [
        { text: "Submit job application form for Insight Hire", priority: "High" },
        { text: "Review AI Research Assistant job description", priority: "Low" },
        { text: "Update resume and LinkedIn profile", priority: "High" }
      ]
    };
  },

  methods: {
    addTask() {
      const taskText = this.newTask.trim();

      if (taskText !== "") {
        this.tasks.unshift({
          text: taskText,
          priority: "Low"
        });

        this.newTask = "";
      }
    },

    togglePriority(task) {
      task.priority = task.priority === "High" ? "Low" : "High";
    },

    deleteTask(index) {
      this.tasks.splice(index, 1);
    }
  }
};