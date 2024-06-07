/*
Задание
Реализуйте и экспортируйте функцию по умолчанию, которая находит дочерние текстовые узлы внутри элемента <div> и оборачивает текст в параграф. Переводы строк и отступы изменяться не должны:

 <body>
   <p>Boom</p>
   text
   <div>Bam</div>
 </body>

prettify(document);
console.log(document.body.innerHTML);

 <body>
  <p>Boom</p>
   text
  <div><p>Bam</p></div>
 </body>
*/

const prettify = (document) => {
  const divs = document.querySelectorAll('div');

  Array.from(divs).map(div => {
    const nodes = div.childNodes;

    for (let node of nodes) {
      const text = node.data;

      if (node instanceof Text && text.trim() !== '') {
        const lines = text.trim().split('\n');

        const tags = lines.map((line) => {
          const pEl = document.createElement('p');
          pEl.innerHTML = line.trim();
          return pEl;
        });

        let el = tags;
        node.replaceWith(el[0]);
        for (let i = 1; i < el.length; i++) {
          el[i-1].after(el[i]);
        }
      } 
    }
  })

  return document;
}

export default prettify;

/*
решение преподавателя:

export default (document) => {
  const divs = [...document.getElementsByTagName('div')];
  divs.forEach((div) => {
    const textNodes = [...div.childNodes]
      .filter((child) => child instanceof Text)
      .filter((child) => child.textContent.trim() !== '');
    textNodes.forEach((node) => {
      const p = document.createElement('p');
      p.textContent = node.textContent;
      node.replaceWith(p);
    });
  });
};
*/
