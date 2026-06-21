const JobDetail = {
template: `
    <div v-if="job">
    <h3>{{ job.title }} <small class="text-muted">({{ job.id }})</small></h3>

    <p><strong>Company:</strong> {{ job.company }}</p>
    <p><strong>Location:</strong> {{ job.location }}</p>
    <p><strong>Category:</strong> {{ job.category }}</p>
    <p><strong>Employment Type:</strong> {{ job.employmentType }}</p>
    <p><strong>Salary:</strong> {{ job.salary }}</p>
    <p><strong>Description:</strong> {{ job.description }}</p>
    <p><strong>Requirements:</strong> {{ job.requirements }}</p>
    <p><strong>Posted Date:</strong> {{ job.postedDate }}</p>
    <p><strong>Application Deadline:</strong> {{ job.deadline }}</p>
    </div>

    <div v-else>
    <p class="text-danger">Job not found.</p>
    </div>
`,

computed: {
    job() {
    return jobs.find(job => job.id === this.$route.params.id);
    }
}
};