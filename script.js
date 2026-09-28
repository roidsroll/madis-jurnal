(function() {
    const GITHUB_USER = 'roidsroll';
    const REPO_NAME = 'madis-jurnal';
    const dateElement = document.getElementById('commit-date');

    // Menggunakan API GitHub dengan header Accept untuk menghindari CORS issue
    fetch(`https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/commits?per_page=1`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response status: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const commitDate = new Date(data[0].commit.committer.date);
          
          // Format tanggal: DD MMMM YYYY
          const formattedDate = commitDate.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

          dateElement.textContent = formattedDate;
        } else {
          dateElement.textContent = 'Tidak ada commit';
        }
      })
      .catch(error => {
        console.error('Error fetching commit date:', error);
        // Fallback jika API terblokir rate limit: ambil dari tanggal dokumen/Vercel header
        const docDate = new Date(document.lastModified);
        dateElement.textContent = docDate.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      });
  })();