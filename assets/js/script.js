class Game {
	constructor() {
		this.svg = document.getElementById('game')
		this.duckSymbolId = '#toast' // Mantendo o ID do símbolo como toast por compatibilidade
		this.scoreEl = document.getElementById('score')
		this.livesEl = document.getElementById('lives')
		this.comboDisplayEl = document.getElementById('combo-display')
		this.finalScoreInfoEl = document.getElementById('final-score-info')
		this.highScoreInfoEl = document.getElementById('high-score-info')
		this.gameOverScreenEl = document.getElementById('game-over-screen')
		this.playAgainBtnEl = document.getElementById('play-again-btn')
		this.ducks = []
		this.score = 0
		this.highScore = this.getHighScore()
		this.spawnInterval = 2000
		this.remainingLives = 5
		this.gameOver = false
		this.gameStartTime = performance.now()
		this.combo = 0
		this.maxCombo = 0
		this.missedDucks = 0

		// Verificar se todos os elementos existem
		if (!this.svg || !this.scoreEl || !this.livesEl || !this.finalScoreInfoEl || !this.gameOverScreenEl) {
			console.error('Elementos necessários não encontrados no DOM')
			return
		}

		this.init()
	}

	init() {
		this.loop = this.loop.bind(this)
		this.setupEventListeners()
		this.updateHighScoreDisplay()
		this.spawnDuck()
		this.startSpawnTimer()
		this.updateLives()
		requestAnimationFrame(this.loop)
	}

	setupEventListeners() {
		// Botão jogar novamente
		if (this.playAgainBtnEl) {
			const handleRestart = (e) => {
				e.preventDefault()
				e.stopPropagation()
				this.restartGame()
			}
			
			// Touch events para mobile
			this.playAgainBtnEl.addEventListener('touchstart', handleRestart, { passive: false })
			this.playAgainBtnEl.addEventListener('touchend', handleRestart, { passive: false })
			
			// Mouse events para desktop
			this.playAgainBtnEl.addEventListener('click', handleRestart)
		}

		// Tecla R para reiniciar (apenas desktop)
		document.addEventListener('keydown', (e) => {
			if (e.key.toLowerCase() === 'r' && this.gameOver) {
				this.restartGame()
			}
		})

		// Prevenir zoom no iOS
		document.addEventListener('gesturestart', (e) => {
			e.preventDefault()
		})
		
		// Prevenir scroll no mobile
		document.addEventListener('touchmove', (e) => {
			e.preventDefault()
		}, { passive: false })
	}

	getHighScore() {
		return parseInt(localStorage.getItem('duckHuntHighScore') || '0')
	}

	saveHighScore() {
		if (this.score > this.highScore) {
			this.highScore = this.score
			localStorage.setItem('duckHuntHighScore', this.highScore.toString())
		}
	}

	updateHighScoreDisplay() {
		if (this.highScoreInfoEl) {
			this.highScoreInfoEl.textContent = `Best: ${this.highScore}`
		}
	}

	startSpawnTimer() {
		if (this.spawnTimer) {
			clearInterval(this.spawnTimer)
		}
		
		const gameTimeSeconds = (performance.now() - this.gameStartTime) / 1000
		// Ajusta a dificuldade baseada no tempo e pontuação
		const difficultyMultiplier = Math.max(0.3, 1 - (gameTimeSeconds / 30) - (this.score / 100))
		this.spawnInterval = Math.max(300, 2000 * difficultyMultiplier)
		
		this.spawnTimer = setInterval(() => {
			if (!this.gameOver) {
				this.spawnDuck()
				this.startSpawnTimer()
			}
		}, this.spawnInterval)
	}

	spawnDuck() {
		if (this.gameOver) return

		const startX = Math.random() * 350 + 25
		const endX = Math.random() * 350 + 25
		const peakY = 150 + Math.random() * 100

		const duck = document.createElementNS('http://www.w3.org/2000/svg', 'use')
		duck.setAttribute('href', this.duckSymbolId)
		duck.setAttribute('class', 'toast duck') // Mantendo classe toast para CSS
		duck.setAttribute('x', startX)
		duck.setAttribute('y', 680)
		this.svg.appendChild(duck)

		// Velocidade variável baseada na dificuldade
		const baseSpeed = 2500 + Math.random() * 1000
		const speedMultiplier = Math.max(0.5, 1 - (this.score / 50))
		const duration = baseSpeed * speedMultiplier

		const duckObj = {
			el: duck,
			startX,
			endX,
			startY: 680,
			peakY,
			startTime: performance.now(),
			duration: duration,
			clicked: false,
			upwardSpeed: -12,
			reachedBottom: false,
			points: 1
		}

		// Event listeners para suporte mobile e desktop
		const handleDuckClick = (e) => {
			e.preventDefault()
			e.stopPropagation()
			this.onDuckClick(duckObj)
		}

		// Touch events para mobile
		duck.addEventListener('touchstart', handleDuckClick, { passive: false })
		duck.addEventListener('touchend', handleDuckClick, { passive: false })
		
		// Mouse events para desktop
		duck.addEventListener('pointerdown', handleDuckClick)
		duck.addEventListener('click', handleDuckClick)

		this.ducks.push(duckObj)
	}

	onDuckClick(duckObj) {
		if (!this.gameOver && !duckObj.clicked) {
			this.combo++
			this.maxCombo = Math.max(this.maxCombo, this.combo)
			
			// Sistema de pontuação com combo
			let points = duckObj.points
			if (this.combo > 1) {
				points *= Math.min(this.combo, 5) // Máximo 5x multiplier
			}
			
			this.score += points
			this.scoreEl.textContent = this.score.toString().padStart(8, '0')
			duckObj.clicked = true
			
			// Atualiza display do combo
			this.updateComboDisplay()
			
			// Efeito visual de acerto
			this.createHitEffect(duckObj.el)
		}
	}

	updateComboDisplay() {
		if (this.comboDisplayEl) {
			if (this.combo > 1) {
				this.comboDisplayEl.textContent = `COMBO: ${this.combo}x`
				this.comboDisplayEl.setAttribute('visibility', 'visible')
				
				// Efeito de fade out do combo
				clearTimeout(this.comboTimeout)
				this.comboTimeout = setTimeout(() => {
					if (this.comboDisplayEl) {
						this.comboDisplayEl.setAttribute('visibility', 'hidden')
					}
				}, 2000)
			} else {
				this.comboDisplayEl.setAttribute('visibility', 'hidden')
			}
		}
	}

	createHitEffect(duckEl) {
		const x = parseFloat(duckEl.getAttribute('x'))
		const y = parseFloat(duckEl.getAttribute('y'))
		
		const effect = document.createElementNS('http://www.w3.org/2000/svg', 'text')
		effect.setAttribute('x', x + 47)
		effect.setAttribute('y', y + 20)
		effect.setAttribute('text-anchor', 'middle')
		effect.setAttribute('font-size', '20')
		effect.setAttribute('fill', '#FFD700')
		effect.setAttribute('stroke', '#FF8C00')
		effect.setAttribute('stroke-width', '1')
		effect.textContent = `+${this.combo > 1 ? this.combo + 'x' : '1'}`
		
		this.svg.appendChild(effect)
		
		// Remove o efeito após animação
		setTimeout(() => {
			if (effect.parentNode) {
				effect.remove()
			}
		}, 1000)
	}

	checkGameOver() {
		if (this.remainingLives <= 0) {
			this.gameOver = true
			clearInterval(this.spawnTimer)
			
			this.saveHighScore()
			this.updateHighScoreDisplay()

			// Mostra a tela de game over de forma simples
			setTimeout(() => {
				this.gameOverScreenEl.setAttribute('visibility','visible')
				this.finalScoreInfoEl.textContent = `Final Score: ${this.score}`
				
				// Mostra estatísticas extras se houver combo
				if (this.maxCombo > 1) {
					setTimeout(() => {
						this.finalScoreInfoEl.textContent += ` (Combo: ${this.maxCombo}x)`
					}, 500)
				}
			}, 200)
		}
	}

	restartGame() {
		// Reset todas as variáveis
		this.score = 0
		this.combo = 0
		this.maxCombo = 0
		this.missedDucks = 0
		this.remainingLives = 5
		this.gameOver = false
		this.gameStartTime = performance.now()
		this.spawnInterval = 2000
		
		// Limpa patos existentes
		this.ducks.forEach(duck => duck.el.remove())
		this.ducks = []
		
		// Remove efeitos visuais
		const effects = this.svg.querySelectorAll('text[fill="#FFD700"]')
		effects.forEach(effect => effect.remove())
		
		// Reset interface
		this.scoreEl.textContent = '00000000'
		this.updateLives()
		this.updateComboDisplay()
		this.gameOverScreenEl.setAttribute('visibility', 'hidden')
		
		// Limpa timeouts
		if (this.comboTimeout) {
			clearTimeout(this.comboTimeout)
		}
		
		// Reinicia o jogo
		if (this.spawnTimer) {
			clearInterval(this.spawnTimer)
		}
		this.spawnDuck()
		this.startSpawnTimer()
		requestAnimationFrame(this.loop)
	}

	loop(timestamp) {
		if (this.gameOver) {
			return
		}

		this.ducks = this.ducks.filter(duck => {
			const t = (timestamp - duck.startTime) / duck.duration

			if (duck.clicked) {
				const currentY = parseFloat(duck.el.getAttribute('y'))
				const newY = currentY + duck.upwardSpeed
				duck.el.setAttribute('y', newY)
				duck.el.setAttribute('pointer-events', 'none')
				duck.el.style.opacity = Math.max(0, 1 - ((duck.startY - newY) / 200))
				
				if (newY < -50) {
					duck.el.remove()
					return false
				}
			} else {
				if (t > 1) {
					if (!duck.reachedBottom) {
						this.remainingLives--
						this.combo = 0 // Reset combo ao perder um pato
						this.updateComboDisplay() // Atualiza display do combo
						this.missedDucks++
						this.updateLives()
						this.checkGameOver()
						duck.reachedBottom = true
					}
					duck.el.remove()
					return false
				}

				// Movimento parabólico mais suave
				const x = duck.startX + (duck.endX - duck.startX) * t
				const y = duck.startY - (4 * t * (1 - t)) * (duck.startY - duck.peakY)

				duck.el.setAttribute('x', x)
				duck.el.setAttribute('y', y)
				
				// Rotação baseada na direção do movimento
				const direction = duck.endX > duck.startX ? 1 : -1
				const rotation = direction * Math.sin(t * Math.PI) * 15
				duck.el.style.transform = `rotate(${rotation}deg)`
			}

			return true
		})

		requestAnimationFrame(this.loop)
	}
	
	updateLives(){
		this.livesEl.textContent = `${this.remainingLives}X`
	}
	
}


// Aguardar o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
	const game = new Game()
})