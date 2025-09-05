# 🦆 Pegue o Pato - Duck Hunt Game

Um jogo divertido e viciante onde você precisa clicar nos patos que voam pela tela para marcar pontos!

## 🎮 Como Jogar

- **Clique ou toque** nos patos que aparecem na tela
- **Faça combos** acertando patos consecutivamente para multiplicar sua pontuação
- **Evite que os patos escapem** - você tem 5 vidas
- **A dificuldade aumenta** conforme você progride no jogo
- **Quando perder**, clique em "JOGAR NOVAMENTE" ou pressione **R** para reiniciar

## ✨ Características

- 🎯 **Sistema de Combo**: Multiplicador de pontos até 5x
- 🏆 **High Score**: Melhor pontuação salva localmente
- 📱 **Mobile-Friendly**: Otimizado para dispositivos móveis
- 🎨 **Animações Suaves**: Patos com asas batendo e olhos piscando
- ⚡ **Dificuldade Progressiva**: Velocidade aumenta com o tempo
- 🔊 **Interface Responsiva**: Adapta a qualquer tamanho de tela

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura do jogo com SVG
- **CSS3**: Estilos e animações
- **JavaScript (ES6+)**: Lógica do jogo e interações
- **SVG**: Gráficos vetoriais para melhor qualidade

## 📁 Estrutura do Projeto

```
pegueopato/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos do jogo
│   ├── js/
│   │   └── script.js       # Lógica do jogo
│   └── images/             # Imagens (futuras)
├── docs/                   # Documentação
└── README.md              # Este arquivo
```

## 🚀 Como Executar

### Método 1: Servidor Local Python
```bash
# Navegue até a pasta do projeto
cd pegueopato

# Execute o servidor Python
python3 -m http.server 8000

# Acesse no navegador
# http://localhost:8000
```

### Método 2: Servidor Node.js
```bash
# Instale o http-server globalmente
npm install -g http-server

# Execute na pasta do projeto
http-server

# Acesse no navegador
# http://localhost:8080
```

### Método 3: Live Server (VS Code)
1. Instale a extensão "Live Server" no VS Code
2. Clique com o botão direito no `index.html`
3. Selecione "Open with Live Server"

## 📱 Acesso Mobile

Para acessar no celular:

1. **Descubra o IP do seu computador**:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows
   ipconfig
   ```

2. **No celular**, acesse:
   ```
   http://[SEU_IP]:8000
   ```
   Exemplo: `http://192.168.1.100:8000`

## 🎯 Pontuação

- **Pato simples**: 1 ponto
- **Combo 2x**: 2 pontos por pato
- **Combo 3x**: 3 pontos por pato
- **Combo 4x**: 4 pontos por pato
- **Combo 5x**: 5 pontos por pato (máximo)

## 🏗️ Futuras Melhorias

- [ ] Efeitos sonoros
- [ ] Diferentes tipos de patos
- [ ] Power-ups especiais
- [ ] Leaderboard online
- [ ] Modo multijogador
- [ ] Achievements/conquistas

## 🤝 Contribuindo

Sinta-se à vontade para contribuir com melhorias:

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ por [Seu Nome]

---

🎮 **Divirta-se jogando!** 🦆
# duckgame
