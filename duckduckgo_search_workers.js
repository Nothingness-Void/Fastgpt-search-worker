const baseurl = 'https://xxx.xxx.xxx/search'; //搭建好的搜索服务地址 要带着/search

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * 处理请求并返回自定义搜索结果
 *
 * @param {Request} request - 请求对象
 * @returns {Promise<Response>} - 返回搜索结果
 */
async function handleRequest(request) {
  const { searchKey, maxResults } = await request.json();

  if (!searchKey) {
    return new Response(JSON.stringify({
      prompt: ''
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const queryParams = new URLSearchParams({
      q: searchKey,
      max_results: maxResults || 10 // Default to 10 if maxResults is not provided
    });

    const response = await fetch(`${baseurl}?${queryParams.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    const customResponse = formatResponse(data);

    return new Response(JSON.stringify({
      prompt: customResponse
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(JSON.stringify({
      prompt: ''
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * 格式化自定义搜索结果
 *
 * @param {Object} data - 自定义搜索结果数据
 * @returns {string} - 格式化后的结果
 */
function formatResponse(data) {
  if (data && data.results && Array.isArray(data.results)) {
    const result = data.results.map((item) => {
      const { title, body } = item;
      return `- Title: ${title}\n  snippet: ${body}`;
    }).join('\n\n');

    return `The below set forth the custom search results, you can use this realtime info, answer user's question. SearchResult:\n\n${result}`;
  } else {
    return 'No search results found.';
  }
}
