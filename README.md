HTML SCRAPER 
==============================

Projeto voltado a web scrapping, onde faremos uma varredura no código fonte de páginas web, trazendo todas a  sua estrutura html. 

### Utilização

Instalação das dependências utilizando o npm install / yarn install

Para começarmos uma varredura pela **CLI** deveremos utilizar o comando 

`node index.js "https://URL.com/"`

![image-20211114133004515](/Users/franciscoamaral/Library/Application Support/typora-user-images/image-20211114133004515.png)

- O retorno será um output na cli trazendo todas as tags html com a contagem de cada e também um output do JSON com o detalhamento de cada tag e seus respetivos aninhamentos.

<img src="/Users/franciscoamaral/Library/Application Support/typora-user-images/image-20211114133558000.png" alt="image-20211114133558000" style="zoom:80%;" />



- Também será gerado dois arquivos nas pastas **HTMLS** e **JSONS**, na pasta HTMLS teremos um arquivo .html com a cópia de todo o código gerado através do web scrapping e na JSONS um arquivo .json com os dados de todas as tags e os seus devidos aninhamentos.



![image-20211114134126812](/Users/franciscoamaral/Library/Application Support/typora-user-images/image-20211114134126812.png)  ![image-20211114134209778](/Users/franciscoamaral/Library/Application Support/typora-user-images/image-20211114134209778.png)

### Raciocínio para obtenção de resultado

Foram utilizadas algumas bibliotecas entre elas a **Cheerio**, fundamental no processo de web scrapping.

Utilizei as funcionalidades nativas do node para ser possível obtenção dos valores repassados na **CLI** e tambem  **FS(file system)**, para criar os arquivos .html e .json.

A ideia principal foi criar uma classe com alguns métodos como, por exemplo, o  `domToJSON()` que será o "core" da aplicação, onde o mesmo percorrerá a partir do head/body as tags html, construindo uma estrutura dados em formato de árvore gravando de forma recursiva os seus filhos aninhados até que não existam como visto no método `getChildData()`.

Para obtenção das tags e das respetivas quantidades, foi utilizado uma expressão regular(**REGEX**).
