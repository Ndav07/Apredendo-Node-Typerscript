# Apredendo-Node-Typerscript

<p>
  Aplicação para iniciar o apredizado com Node, sendo o objetivo da aplicação fazer o aluguel de carros. Será necessário fazer o cadastro de usuário para conseguir ter acesso as funções do aplicativo, sendo que algumas funções como criar carro, fazer upload das imagens, criar categoria de carro além de criar a especificação do carro, é necessário que o usuário seja <strong>ADMIN</strong>.</br>
  O projeto foi desenvolvido em padrão Singleton, no qual todas minhas instâncias são executadas apenas uma vez, pois na hora de iniciar a aplicação eu importo meus conteiners, no qual faço a injeção com tsringe nos <strong>casos de uso</strong>, tentando ao máximo fazer um código limpo e com pastas divididas de forma coerrente, assim facilitando a compreenção do código.</br>
  Um dos dos desafios é fazer a verificações de datas, para calcular valor, se a devolução foi na data prevista e coisas desse tipo, para isso utilizei o dayjs, que permite utilizar algumas funções que facilita a vida, como ver a diferença entre uma data e outra e retornar em horas ou dias dependendo de sua vontade.</br>
  Na aplicação você consegue tem funções que permitem a criação de um usuário, reset de senha, atualização de avatar, inserir carro no banco de cadastro, criar especificação, categoria, listar os carros que estão disponiveis, listar categorias, listar specificações, inserir imagens do carro, criar aluguel, fazer a devolução do carro para dar baixa no sistema e listar os alugueis pelo usuário.
<p>
