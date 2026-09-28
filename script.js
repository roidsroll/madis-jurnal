
 
  const GITHUB_USER = 'roidsroll';
  const REPO_NAME = 'madis-jurnal';

  async function loadLastUpdatedDate() {
    const dateElement = document.getElementById('commit-date');

    try {
      // Mengambil 1 commit terbaru dari branch utama
      const response = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/commits?per_page=1`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const commits = await response.json();

      if (commits && commits.length > 0) {
        const lastCommitDate = new Date(commits[0].commit.committer.date);

        // Format tanggal dalam bahasa Indonesia (Contoh: 28 September 2026)
        const formattedDate = lastCommitDate.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

        dateElement.innerText = formattedDate;
      } else {
        dateElement.innerText = '-';
      }
    } catch (error) {
      console.error('Gagal mengambil tanggal commit dari GitHub:', error);
      dateElement.innerText = '-';
    }
  }

  // Jalankan fungsi saat halaman dimuat
  loadLastUpdatedDate();