---
title: Entendendo uma requisição Web
date: 2026-07-02
category: Redes
---

Este artigo faz parte da série "Como Funciona a Internet". Antes de estudar computação em nuvem, acredito que vale a pena revisar os fundamentos da Web. Ao longo deste texto veremos como uma requisição percorre o caminho entre o navegador e uma aplicação, passando por componentes como DNS, TCP, TLS e HTTP.


## Fluxo básico de uma requisição Web

Ao acessar um site, como por exemplo `https://google.com`, a requisição passa por um fluxo de protocolos que envolvem a descoberta do servidor de destino, o estabelecimento de uma conexão confiável, a proteção dos dados por meio de criptografia e a definição da forma como cliente e servidor irão se comunicar.

Antes de entendermos cada protocolo individualmente, vale a pena visualizar esse fluxo de forma geral.

![Fluxo básico de uma requisição Web](/imgs/posts/fluxo-requisicao-web.png)

De forma resumida, esse é o caminho percorrido por uma requisição Web, desde o momento em que o usuário digita uma URL no navegador até a resposta ser exibida na tela. Nos próximos tópicos vamos entender qual é o papel de cada etapa desse processo.

## DNS (Domain Name System)

O primeiro passo para acessar um site é descobrir onde ele está. Computadores se comunicam por meio de endereços IP, e não por nomes de domínio como `google.com`. Se precisássemos memorizar o endereço IP de cada site que acessamos, navegar na Internet seria muito mais difícil.

É nesse momento que entra o DNS (Domain Name System). Sua principal função é traduzir um nome de domínio para um endereço IP, permitindo que o navegador descubra qual servidor deve receber a requisição.

Por exemplo, ao acessar `https://google.com`, o navegador consulta um servidor DNS para descobrir o endereço IP correspondente. Após obter essa informação, ele já sabe para qual servidor deve iniciar a conexão.

## TCP (Transmission Control Protocol)

Depois de descobrir o endereço IP do servidor, o navegador já sabe para onde deve enviar a requisição. No entanto, antes que qualquer dado seja transmitido, é necessário estabelecer uma conexão confiável entre cliente e servidor. É nesse momento que entra o TCP (Transmission Control Protocol).

O TCP é responsável por garantir que os dados sejam entregues de forma íntegra, na ordem correta e sem perdas. Para isso, utiliza mecanismos como numeração de segmentos, confirmações (ACK), retransmissão, controle de fluxo e controle de congestionamento.

Antes da troca de qualquer informação, cliente e servidor estabelecem uma conexão por meio do Three-Way Handshake. Somente após essa etapa a comunicação pode começar.

## TLS (Transport Layer Security)

Depois que o TCP estabelece uma conexão confiável entre cliente e servidor, ainda existe um problema: todas as informações trafegam pela rede e podem ser interceptadas por terceiros. Para proteger essa comunicação, entra em cena o TLS (Transport Layer Security).

O TLS é responsável por garantir a confidencialidade e a integridade dos dados, além de autenticar a identidade do servidor por meio de certificados digitais emitidos por Autoridades Certificadoras (CA).

Durante o TLS Handshake, cliente e servidor negociam uma chave de sessão utilizando criptografia assimétrica. A partir desse momento, toda a comunicação passa a utilizar criptografia simétrica, que oferece melhor desempenho para a troca contínua de dados.

Quando o protocolo HTTP é utilizado sobre uma conexão protegida por TLS, temos o HTTPS.

## HTTP (HyperText Transfer Protocol)

Depois que a conexão entre cliente e servidor foi estabelecida e protegida pelo TLS, ainda existe uma questão importante: como os dois sabem o que está sendo solicitado e como a resposta deve ser enviada? É nesse momento que entra o HTTP (HyperText Transfer Protocol).

O HTTP é um protocolo da camada de aplicação responsável por definir como clientes e servidores se comunicam na Web. Ele segue o modelo de requisição e resposta, no qual o cliente envia uma requisição HTTP e o servidor retorna uma resposta HTTP.

O protocolo é stateless, ou seja, cada requisição é tratada de forma independente e o servidor não mantém informações sobre requisições anteriores. Para isso, o HTTP define métodos como GET, POST, PUT, PATCH e DELETE, além de códigos de status, como 200, 404 e 500, que indicam o resultado do processamento da requisição.

## Conclusão

Embora acessar um site pareça uma tarefa simples, existe uma sequência de protocolos e componentes trabalhando em conjunto para que isso aconteça. Cada etapa do fluxo resolve um problema específico: o DNS encontra o servidor, o TCP estabelece uma conexão confiável, o TLS protege a comunicação e o HTTP define como cliente e servidor trocam informações.

Neste artigo vimos apenas uma visão geral desse processo. Nos próximos artigos da série, vamos aprofundar cada uma dessas etapas para entender como elas funcionam internamente e por que são fundamentais para a Web moderna.