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
	const numberOfTimesViewedListElement = document.querySelector(
		'.number-of-times-viewed-container'
	)

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
		newDot.classList = 'dot active-dot'

		const viewTotalElementToBeUpdated = document.getElementById(
			`times-viewed-${id}`
		)
		viewTotalElementToBeUpdated.innerText =
			parseInt(viewTotalElementToBeUpdated.innerText) + 1
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
		autoplayBackwardIconElement.classList = ''
		if (typeof playForwardSetInterval === 'number') {
			clearInterval(playForwardSetInterval)
			autoplayForwardIconElement.classList = ''
			playForwardSetInterval = null
		} else {
			playForwardSetInterval = setInterval(nextSlide, intervalTime)
			autoplayForwardIconElement.classList = 'active-icon'
		}
	}

	function toggleAutoPlayBackward() {
		clearInterval(playForwardSetInterval)
		playForwardSetInterval = null
		autoplayForwardIconElement.classList = ''
		if (typeof playBackwardSetInterval === 'number') {
			clearInterval(playBackwardSetInterval)
			autoplayBackwardIconElement.classList = ''
			playBackwardSetInterval = null
		} else {
			playBackwardSetInterval = setInterval(prevSlide, intervalTime)
			autoplayBackwardIconElement.classList = 'active-icon'
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

			const imageNumber = document.createElement('div')
			imageNumber.classList = 'img-number'
			imageNumber.innerText = i
			listItemElement.appendChild(imageNumber)
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

	function createTimesViewedListItems(numOfSlides) {
		for (let i = 0; i < numOfSlides; i++) {
			const timesViewedListItemElement = document.createElement('li')
			timesViewedListItemElement.id = `number-of-times-viewed-${i}`
			timesViewedListItemElement.innerText = `Number of times Image #${i} has been viewed: `

			const timesViewedListItemAmountElement = document.createElement('span')
			timesViewedListItemAmountElement.id = `times-viewed-${i}`
			if (timesViewedListItemElement.id === 'number-of-times-viewed-0') {
				timesViewedListItemAmountElement.innerText = 1
			} else {
				timesViewedListItemAmountElement.innerText = 0
			}
			timesViewedListItemElement.appendChild(timesViewedListItemAmountElement)

			numberOfTimesViewedListElement.appendChild(timesViewedListItemElement)
		}
	}

	createSlides(numOfSlides)
	createDots(numOfSlides)
	createTimesViewedListItems(numOfSlides)

	autoplayBackwardIconElement.addEventListener('click', toggleAutoPlayBackward)

	autoplayForwardIconElement.addEventListener('click', toggleAutoPlayForward)

	prevIconElement.addEventListener('click', prevSlide)
	nextIconElement.addEventListener('click', nextSlide)

	const initialDot = document.getElementById(`dot${currentSlide}`)
	initialDot.classList = 'dot active-dot'
}

initializeApp(6)
