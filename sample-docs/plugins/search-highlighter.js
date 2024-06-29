(function () {
  const searchHighlighter = function (hook, vm) {
    hook.doneEach(function () {
      const KEYWORD_TAG = '{keyword}';

      function replaceKeywordToTag(node, keyword, tag = KEYWORD_TAG) {
        const keywordRe = new RegExp(keyword, 'g');

        if (node.childNodes.length) {
          for(node of node.childNodes){
            replaceKeywordToTag(node, keyword, tag);
          }
        } else {
          if(node.nodeName == '#text' && node.nodeValue.includes(keyword)){
            node.nodeValue = node.nodeValue.replace(keywordRe, tag);
          }
        }
      }

      function removeHighlight(node) {
        const highlightRe = new RegExp('<span[^>]*style\\s*=\\s*["\'][^"\']*background-color\\s*:\\s*yellow[^"\']*["\'][^>]*>(.*?)<\\/span>', 'g');

        if (node.innerHTML.match(highlightRe)) {
          node.innerHTML = node.innerHTML.replace(highlightRe, '$1');
        }
      }

      // add event function to search input
      const searchInput = document.querySelector('input[placeholder="Type to search"]');
      if (searchInput) {
        searchInput.addEventListener('change', function (e) {
          const keyword = e.target.value;

          const postNodes = document.querySelectorAll('.matching-post');
          postNodes.forEach(function (pNode) {
            pNode.addEventListener('click', function(_) {
              setTimeout(() => {
                const article = document.getElementById('main');
                if (article) {
                  const articleNodes = Array.from(article.children);
                  let foundFirstNode = false;

                  articleNodes.forEach(function (aNode) {
                    const keywordRe = new RegExp(keyword, 'g');
                    const tagRe = new RegExp(KEYWORD_TAG, 'g');
                    const replaceText = `<span style="background-color: yellow;">${keyword}</span>`;

                    if (aNode.innerHTML.match(keywordRe)) {
                      if (!foundFirstNode) {
                        aNode.scrollIntoView({ behavior: 'smooth' });
                        foundFirstNode = true;
                      }

                      replaceKeywordToTag(aNode, keyword, KEYWORD_TAG);
                      aNode.innerHTML = aNode.innerHTML.replace(tagRe, replaceText);
                    }
                  });
                }
              }, 700);
            });
          });
        });

        searchInput.addEventListener('input', function (e) {
          const keyword = e.target.value;

          if (keyword === '') {
            const article = document.getElementById('main');
            if (article) {
              const articleNodes = Array.from(article.children);

              articleNodes.forEach(function (aNode) {
                removeHighlight(aNode);
              });
            }
          }
        });
      }

      // add event function to clear button
      const clearBtn = document.querySelector('.clear-button');
      if (clearBtn) {
        clearBtn.addEventListener('click', function (e) {
          const article = document.getElementById('main');
          if (article) {
            const articleNodes = Array.from(article.children);

            articleNodes.forEach(function (aNode) {
              removeHighlight(aNode);
            });
          }
        });
      }
    });
  };


  $docsify = $docsify || {};
  $docsify.plugins = [].concat($docsify.plugins || [], searchHighlighter);
})();
