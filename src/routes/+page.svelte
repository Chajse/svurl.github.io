<script>
  import QRCode from 'qrcode';
  let originalUrl = '';
  let shortUrl = '';
  let qrCodeData = '';

  const shortenUrl = async () => {
    // Ensure your API endpoint URL is correct
    const response = await fetch('http://localhost:3000/api/shortened-urls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl })
    });

    if (response.ok) {
      const data = await response.json();
      shortUrl = data.shortUrl; // Assuming 'shortUrl' is returned from the server
      generateQRCode(shortUrl);
    } else {
      console.error('Failed to shorten URL');
    }
  };

  let customUrlName = '';

  function handleSubmit(event) {
    event.preventDefault();
    // Handle the form submission logic here
    console.log('Custom URL Name:', customUrlName);
  };

  const generateQRCode = async (url) => {
    try {
      qrCodeData = await QRCode.toDataURL(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };
</script>

<div class="min-h-screen flex flex-col items-center bg-gray-900 text-white">
  <!-- Header -->
  <header class="w-full bg-gray-800 text-center py-4">
    <h1 class="text-4xl">
      <span class="text-sred">SV</span><span class="text-white font-bold">URL</span>
    </h1>
  </header>

  <!-- Main Content -->
  <main class="flex flex-col items-center mt-12 px-6 w-full">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-semibold mb-4 text-center">Shorten URL</h2>
      <input
        type="text"
        bind:value={originalUrl}
        placeholder="Enter a URL"
        class="w-full p-3 mb-4 text-gray-900 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
      />
      <div>
        <form on:submit={handleSubmit} class="flex flex-col items-center w-full">
          <label for="customUrlName" class="mb-2 text-lg text-white">Custom URL Name:</label>
          <input
            type="text"
            id="customUrlName"
            bind:value={customUrlName}
            class="mb-4 p-2 border rounded-lg w-full text-gray-900"
            placeholder= "enter custom URL name (optional)"
          />
      </div>
      <div class="button-container">
        <button
          on:click={shortenUrl}
          class="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition border justify-center w-full"
        >
          Shorten
        </button>
      </div>

      {#if shortUrl}
        <div class="mt-6">
          <p>
            <strong>Shortened URL:</strong>
            <a
              href={shortUrl}
              target="_blank"
              class="text-red-400 underline hover:text-red-300"
              >{shortUrl}</a
            >
          </p>
          <div class="mt-4 text-center">
            <h3 class="text-lg font-medium">QR Code:</h3>
            <img src={qrCodeData} alt="QR Code" class="mt-4 inline-block rounded-lg shadow-md" />
          </div>
        </div>
      {/if}
    </div>
  </main>

  <!-- Footer -->
  <footer class="w-full bg-gray-800 text-center py-4 mt-auto">
    <p class="text-sm text-gray-400">&copy; 2024 SVURL. All rights reserved.</p>
  </footer>
</div>
