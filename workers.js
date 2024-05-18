const bingSearchKey = ''; //put your being search key here. Apply the key on Azure
const baseurl = 'https://api.bing.microsoft.com/v7.0/custom/search';
const customconfig = '' //put your customconfig here

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const { searchKey } = await request.json();

  if (!searchKey) {
    return new Response(JSON.stringify({
      prompt: ''
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(`${baseurl}?q=${encodeURIComponent(searchKey)}&customconfig=${encodeURIComponent(customconfig)}&count=10&mkt=zh-CN&responseFilter=Webpages`, {
      headers: {
        'Ocp-Apim-Subscription-Key': bingSearchKey,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data && data.webPages && data.webPages.value && Array.isArray(data.webPages.value)) {
      const result = data.webPages.value.map((item) => {
        const { name, url, snippet, isNavigational } = item;
        const isNavigationalText = isNavigational ? 'Yes' : 'No';
        return `- Title：[${name}](${url})\n  snippet：${snippet}\n  Is Navigational Page?：${isNavigationalText}`;
      }).join('\n\n');

      return new Response(JSON.stringify({
        prompt: `The below set forth the Bing search results，you can use this realtime info，answer user's question。the Searchkey: ${searchKey}; SearchResult:\n\n${result}`
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({
        prompt: 'No search results found.'
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (err) {
    return new Response(JSON.stringify({
      prompt: ''
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
