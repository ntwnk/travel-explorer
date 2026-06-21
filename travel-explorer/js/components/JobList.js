const JobList = {
template: `
    <div class="job-list">
    <router-link to="/">Overview</router-link>

    <router-link 
        v-for="job in jobs"
        :key="job.id"
        :to="'/job/' + job.id">
        {{ job.id }}
    </router-link>
    </div>
`,

data() {
    return {
    jobs: jobs
    };
}
};