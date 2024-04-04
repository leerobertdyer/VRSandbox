import { useEffect, useState } from "react";
import {startSession, stopSession} from '@react-three/xr'

export default function VRXP()
{

	const [isInitialLoad, setIsInitialLoad] = useState(true)
	const [isImmersed, setIsImmersed] = useState(false)
	const [isLoadingImmersive, setIsLoadingImmersive] = useState(false)
	const [isXrSupported, setIsXrSupported] = useState(false)
	
	const xrSessionInit = {
		requiredFeatures: ['local-floor'],
	}
	
	// on first load, check if WebXR is supported on this browser
	useEffect(() => {
		checkXrSessionSupport()
	}, [])
	
	// when 'isImmersed' is changed, either enter or exit immersion
	useEffect(() => {
		// if this is the initial load, don't enter or exit immersion
		if (isInitialLoad) {
			setIsInitialLoad(false)
		}
		// if this is not the initial load, proceed with entering or exiting immersion
		else {
			// if 'isImmersed' has just become true, then we need to enter immersion
			if (isImmersed) {
				enterImmersion().catch((error) => {
					console.error(error)
					throw new Error('Error while entering immersion!')
				})
			}
			// if 'isImmersed' has just become false, then we need to exit immersion
			else {
				exitImmersion().catch((error) => {
					console.error(error)
					throw new Error('Error while exiting immersion!')
				})
			}
		}
	}, [isImmersed])
	
	// see if this browser supports WebXR
	function checkXrSessionSupport() {
		if ('xr' in navigator) {
			navigator.xr
			?.isSessionSupported('immersive-vr')
			.then((supported) => {
				if (!supported) {
					console.warn('WebXR is not supported on this browser')
				} else {
					console.info('WebXR is supported on this browser')
				}
				setIsXrSupported(supported)
			})
			.catch((error) => {
				console.error('Error while checking for WebXR support on this browser', error)
				setIsXrSupported(false)
			})
		}
	}
	
	// event handler for clicking the 'Enter VR' button
	function handleEnterVrClicked() {
		// only allow entry into 'immersive' if WebXR is supported
		// and if we're not loading into 'immersive' already
		if (isXrSupported && !isLoadingImmersive) {
			setIsImmersed(true)
		}
	}
	
	// event handler for clicking the virtual 'Exit VR' button
	function handleExitVrClicked() {
		setIsImmersed(false)
	}
	
	// event handler for when the user exits immersion some other way
	// (e.g. by pressing the 'menu' button on the motion controller)
	function handleOnSessionEnd() {
		setIsImmersed(false)
	}
	
	// start the WebXR session
	async function enterImmersion() {
		// turn on the loading state that's specifically about loading into 'immersive'
		setIsLoadingImmersive(true)
		// attempt to establish a WebXR session
		const xrSession = await startSession('immersive-vr', xrSessionInit)
		try {
			// if the xrSession was established successfully
			if (xrSession !== undefined) {
				// turn off the loading state that's specifically about loading into 'immersive'
				setIsLoadingImmersive(false)
			}
		} catch (error) {
			// if the xrSession failed to be established, handle errors
			console.error('error entering immersion', error)
			throw new Error('error entering immersion, see console for info')
		}
	}
	
	// end the WebXR session
	async function exitImmersion() {
		try {
			await stopSession()
		} catch (error) {
			console.error('error exiting immersion', error)
			throw new Error('error exiting immersion, see console for info')
		}
	}
}