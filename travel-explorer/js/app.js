const App = {
  components: {
    JobList,
    ApplicationForm,
    ToDoList
  },

  template: `
    <div class="container mt-4 mb-5">

      <header class="main-header">
        <h1>Insight Hire</h1>
        <p class="mb-0">Explore jobs, submit an application, and manage your tasks.</p>
      </header>

      <section class="section-card" id="jobs">
        <h2 class="mb-4">Job Explorer</h2>

        <div class="row">
          <div class="col-md-4 mb-3">
            <JobList />
          </div>

          <div class="col-md-8">
            <router-view></router-view>
          </div>
        </div>
      </section>

      <ApplicationForm />

      <ToDoList />

    </div>
  `
};

Vue.createApp(App)
  .use(router)
  .mount("#app");