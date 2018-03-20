class Github {
    constructor() {
        this.client_id = '65e749d04acd1e6f6d8d'
        this.client_secret = '791f8887cad9ede8e052838127225f851ef110ad'
        this.repos_count = 5
        this.repos_sort = 'created: asc'
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`)
        
        const profile = await profileResponse.json()
        const repos = await repoResponse.json()

        return {
            profile,
            repos
        }
    }
}