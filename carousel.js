function initializeApp(numOfSlides) {
	const imageTrackElement = document.querySelector('.image-track')
	const dotContainerElement = document.querySelector('.dot-container')
	const autoplayForwardIconElement = document.getElementById(
		'autoplay-forward-icon'
	)
	const autoplayBackwardIconElement = document.getElementById(
		'autoplay-backward-icon'
	)
	const prevIconElement = document.getElementById('prev-icon')
	const nextIconElement = document.getElementById('next-icon')

	const intervalTime = 800

	let currentSlide = 0
	let playForwardSetInterval = null
	let playBackwardSetInterval = null

	function scrollToElement(id) {
		const imageElement = document.getElementById(`image${id}`)
		imageElement.scrollIntoView({
			behavior: 'smooth',
			inline: 'center',
		})

		const allDots = document.querySelectorAll('.dot')
		allDots.forEach((dot) => (dot.classList = 'dot'))

		currentSlide = id
		const newDot = document.getElementById(`dot${id}`)
		newDot.classList = 'dot active'
	}

	function nextSlide() {
		let targetSlide = currentSlide + 1
		if (targetSlide > numOfSlides - 1) targetSlide = 0
		scrollToElement(targetSlide)
	}

	function prevSlide() {
		let targetSlide = currentSlide - 1
		if (targetSlide < 0) targetSlide = numOfSlides - 1
		scrollToElement(targetSlide)
	}

	function toggleAutoPlayForward() {
		clearInterval(playBackwardSetInterval)
		playBackwardSetInterval = null
		if (typeof playForwardSetInterval === 'number') {
			clearInterval(playForwardSetInterval)
			playForwardSetInterval = null
		} else {
			playForwardSetInterval = setInterval(nextSlide, intervalTime)
		}
	}

	function toggleAutoPlayBackward() {
		clearInterval(playForwardSetInterval)
		playForwardSetInterval = null
		if (typeof playBackwardSetInterval === 'number') {
			clearInterval(playBackwardSetInterval)
			playForwardSetInterval = null
		} else {
			playBackwardSetInterval = setInterval(prevSlide, intervalTime)
		}
	}

	function createSlides(numOfSlides) {
		for (let i = 0; i < numOfSlides; i++) {
			const listItemElement = document.createElement('li')
			const imageElement = document.createElement('img')
			const randomImage = 'https://picsum.photos/200'

			imageElement.src = randomImage
			imageElement.id = `image${i}`
			imageElement.alt = `image ${i} description`

			listItemElement.appendChild(imageElement)
			imageTrackElement.appendChild(listItemElement)
		}
	}

	function createDots(numOfSlides) {
		for (let i = 0; i < numOfSlides; i++) {
			const dotElement = document.createElement('li')
			dotElement.classList = 'dot'
			dotElement.id = `dot${i}`
			dotElement.addEventListener('click', () => scrollToElement(i))

			dotContainerElement.appendChild(dotElement)
		}
	}

	createSlides(numOfSlides)
	createDots(numOfSlides)

	autoplayBackwardIconElement.addEventListener('click', toggleAutoPlayBackward)

	autoplayForwardIconElement.addEventListener('click', toggleAutoPlayForward)

	prevIconElement.addEventListener('click', prevSlide)
	nextIconElement.addEventListener('click', nextSlide)

	const initialDot = document.getElementById(`dot${currentSlide}`)
	initialDot.classList = 'dot active'
}

initializeApp(6)
