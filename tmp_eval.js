var card = document.querySelector('.cat-third-card');
JSON.stringify({href: card ? card.href : 'NOT_FOUND', text: card ? card.textContent.trim() : ''});
