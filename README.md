# Nível 3: Avançado (Foco em Regras de Segurança e Banco Dinâmico)

Projeto: Backend de Clínica Médica (Pacientes e Consultas) Neste projeto teremos checagens severas de regras de negócios antes de efetuar as consultas SQL.

## 1. Estrutura:

patients : id , cpf (UNIQUE), name , password .

appointments (consultas): id , date , time , reason , status (ex: "agendado",

"cancelado", "concluído"), patientId (FK).

## 2. Regras de Negócios na Criação: 
Ao criar um appointment via POST , as seguintes lógicas devem ocorrer obrigatoriamente nesta ordem no Controller: Checar se o JSON HTTP enviou date , time e patientId . Faltou algo? Retorne Erro 400.

Ir ao Banco de Dados checar se o patientId existe de fato usando um SELECT e validando. Se não, retorne Erro 404.

Desafio de Query: Checar no banco de dados, usando um SELECT, se já existe alguma consulta marcada naquela date e time exatos independentemente do paciente. Existindo, retornar status 409 (Conflict) com JSON informando que o horário está ocupado.

Se tudo passar, faça o INSERT com o status da nova consulta passando a ser automaticamente "agendado".

## 3. Módulo de Login Simples: Uma rota POST /patients/login que valide o cpf e password . 
Retornar o model do paciente caso faça o login corretamente (Status 200 ). Se CPF não existir, 404 . Se senha errada, 401 .

## Desafio Bônus Final

Pegue o Projeto da Clínica Médica (Nível 3) e adicione a rota PUT /appointments/:id para atualizar as informações de uma consulta:

Restrição de Campos: Somente o campo status e a variável reason (motivo) da consulta podem ser alterados pelo cliente.

Construção Dinâmica (Array Updates): Construa dinamicamente a query SQL para aceitar a alteração de apenas um ou dos dois dados na mesma chamada HTTP (assim como feito usando arrays updates.push e .join(', ') na aula).

Ignorar Dados Proibidos: Se a requisição tentar alterar o campo date ou time ou patientId , a API simplesmente ignora esses parâmetros na construção da query, não gerando falhas nem atualizando o banco com tais dados sensíveis.

## Dica para praticar: Crie diretórios/arquivos para pelo menos um desses cenários usando exatamente o padrão adotado até agora ( routers/ , controllers/ , models/ ). Isso treinará bastante sua memorização sobre a arquitetura e em qual camada a regra de negócio fica isolada.
