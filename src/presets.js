import { combineRgb } from '@companion-module/base'

const ColorWhite = combineRgb(255, 255, 255)
const ColorBlack = combineRgb(0, 0, 0)
const ColorRed = combineRgb(200, 0, 0)
const ColorDarkRed = combineRgb(128, 0, 0)
const ColorGreen = combineRgb(0, 200, 0)
const ColorYellow = combineRgb(212, 174, 0)
const ColorBlue = combineRgb(0, 80, 200)
const ColorDarkBlue = combineRgb(0, 0, 128)
const ColorOrange = combineRgb(255, 140, 0)
const ColorGray = combineRgb(64, 64, 64)

/**
 * Get the preset definitions for the Shure Wireless module.
 *
 * @access public
 * @since 2.4.0
 */
export function getPresets() {
	const presets = {}

	// ========================
	// Channel Status Display
	// ========================
	for (let ch = 1; ch <= this.model.channels; ch++) {
		let labelDefault, iconDefault

		switch (this.model.family) {
			case 'qlx':
			case 'ulx':
				labelDefault = ['name', 'frequency', 'txType', 'txPowerLevel']
				iconDefault = ['battery', 'locks', 'rf', 'audio', 'encryption']
				break
			case 'slx':
				labelDefault = ['name', 'frequency', 'audioGain', 'txType']
				iconDefault = ['battery', 'rf', 'audio']
				break
			case 'ad':
				labelDefault = ['name', 'frequency', 'txType', 'txPowerLevel']
				iconDefault = ['battery', 'locks', 'rf', 'audio', 'encryption', 'quality']
				break
		}

		presets[`ch_${ch}_status`] = {
			type: 'button',
			category: 'Channel Status',
			name: `Channel ${ch} Status`,
			style: {
				text: '',
				size: '7',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'sample',
					options: {
						channel: `${ch}`,
						labels: labelDefault,
						icons: iconDefault,
						barlevel: 2,
					},
				},
			],
		}
	}

	// ========================
	// Channel Name Display
	// ========================
	for (let ch = 1; ch <= this.model.channels; ch++) {
		presets[`ch_${ch}_name`] = {
			type: 'button',
			category: 'Channel Info',
			name: `Channel ${ch} Name`,
			style: {
				text: `CH ${ch}\\n$(shure-wireless:ch_${ch}_name)`,
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'transmitter_turned_off',
					options: {
						channel: `${ch}`,
					},
					style: {
						bgcolor: ColorDarkBlue,
						color: ColorWhite,
					},
				},
			],
		}
	}

	// ========================
	// Battery Status
	// ========================
	for (let ch = 1; ch <= this.model.channels; ch++) {
		presets[`ch_${ch}_battery`] = {
			type: 'button',
			category: 'Channel Info',
			name: `Channel ${ch} Battery`,
			style: {
				text: `CH ${ch} BAT\\n$(shure-wireless:ch_${ch}_battery_runtime)`,
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'battery_level',
					options: {
						channel: `${ch}`,
						barlevel: 2,
					},
					style: {
						bgcolor: ColorRed,
						color: ColorWhite,
					},
				},
				{
					feedbackId: 'transmitter_turned_off',
					options: {
						channel: `${ch}`,
					},
					style: {
						bgcolor: ColorDarkBlue,
						color: ColorWhite,
					},
				},
			],
		}
	}

	// ========================
	// Frequency Display
	// ========================
	for (let ch = 1; ch <= this.model.channels; ch++) {
		presets[`ch_${ch}_frequency`] = {
			type: 'button',
			category: 'Channel Info',
			name: `Channel ${ch} Frequency`,
			style: {
				text: `CH ${ch}\\n$(shure-wireless:ch_${ch}_frequency)`,
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// ========================
	// Audio Gain Display
	// ========================
	for (let ch = 1; ch <= this.model.channels; ch++) {
		presets[`ch_${ch}_gain_display`] = {
			type: 'button',
			category: 'Channel Info',
			name: `Channel ${ch} Audio Gain`,
			style: {
				text: `CH ${ch} GAIN\\n$(shure-wireless:ch_${ch}_audio_gain)`,
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// ========================
	// Mute / Unmute / Toggle (ULX & AD only)
	// ========================
	if (this.model.family == 'ulx' || this.model.family == 'ad') {
		for (let ch = 1; ch <= this.model.channels; ch++) {
			presets[`ch_${ch}_mute_toggle`] = {
				type: 'button',
				category: 'Audio Mute',
				name: `Channel ${ch} Mute Toggle`,
				style: {
					text: `CH ${ch}\\nMUTE`,
					size: 'auto',
					color: ColorWhite,
					bgcolor: ColorGray,
				},
				steps: [
					{
						down: [
							{
								actionId: 'channel_mute',
								options: {
									channel: `${ch}`,
									choice: 'TOGGLE',
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'channel_muted',
						options: {
							channel: `${ch}`,
						},
						style: {
							bgcolor: ColorRed,
							color: ColorWhite,
						},
					},
				],
			}

			presets[`ch_${ch}_mute_on`] = {
				type: 'button',
				category: 'Audio Mute',
				name: `Channel ${ch} Mute`,
				style: {
					text: `CH ${ch}\\nMUTE ON`,
					size: 'auto',
					color: ColorWhite,
					bgcolor: ColorGray,
				},
				steps: [
					{
						down: [
							{
								actionId: 'channel_mute',
								options: {
									channel: `${ch}`,
									choice: 'ON',
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'channel_muted',
						options: {
							channel: `${ch}`,
						},
						style: {
							bgcolor: ColorRed,
							color: ColorWhite,
						},
					},
				],
			}

			presets[`ch_${ch}_mute_off`] = {
				type: 'button',
				category: 'Audio Mute',
				name: `Channel ${ch} Unmute`,
				style: {
					text: `CH ${ch}\\nUNMUTE`,
					size: 'auto',
					color: ColorWhite,
					bgcolor: ColorGray,
				},
				steps: [
					{
						down: [
							{
								actionId: 'channel_mute',
								options: {
									channel: `${ch}`,
									choice: 'OFF',
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'channel_muted',
						options: {
							channel: `${ch}`,
						},
						style: {
							bgcolor: ColorRed,
							color: ColorWhite,
						},
					},
				],
			}
		}
	}

	// ========================
	// Audio Gain Adjust
	// ========================
	for (let ch = 1; ch <= this.model.channels; ch++) {
		presets[`ch_${ch}_gain_up_3`] = {
			type: 'button',
			category: 'Audio Gain',
			name: `Channel ${ch} Gain +3 dB`,
			style: {
				text: `CH ${ch}\\nGAIN\\n+3`,
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorGray,
			},
			steps: [
				{
					down: [
						{
							actionId: 'channel_increasegain',
							options: {
								channel: `${ch}`,
								gain: '3',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets[`ch_${ch}_gain_down_3`] = {
			type: 'button',
			category: 'Audio Gain',
			name: `Channel ${ch} Gain -3 dB`,
			style: {
				text: `CH ${ch}\\nGAIN\\n-3`,
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorGray,
			},
			steps: [
				{
					down: [
						{
							actionId: 'channel_decreasegain',
							options: {
								channel: `${ch}`,
								gain: '3',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets[`ch_${ch}_gain_up_1`] = {
			type: 'button',
			category: 'Audio Gain',
			name: `Channel ${ch} Gain +1 dB`,
			style: {
				text: `CH ${ch}\\nGAIN\\n+1`,
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorGray,
			},
			steps: [
				{
					down: [
						{
							actionId: 'channel_increasegain',
							options: {
								channel: `${ch}`,
								gain: '1',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets[`ch_${ch}_gain_down_1`] = {
			type: 'button',
			category: 'Audio Gain',
			name: `Channel ${ch} Gain -1 dB`,
			style: {
				text: `CH ${ch}\\nGAIN\\n-1`,
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorGray,
			},
			steps: [
				{
					down: [
						{
							actionId: 'channel_decreasegain',
							options: {
								channel: `${ch}`,
								gain: '1',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		// Set gain to 0 dB (unity)
		presets[`ch_${ch}_gain_unity`] = {
			type: 'button',
			category: 'Audio Gain',
			name: `Channel ${ch} Gain 0 dB`,
			style: {
				text: `CH ${ch}\\nGAIN\\n0 dB`,
				size: 'auto',
				color: ColorBlack,
				bgcolor: ColorYellow,
			},
			steps: [
				{
					down: [
						{
							actionId: 'channel_setaudiogain',
							options: {
								channel: `${ch}`,
								gain: '0',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'channel_gain',
					options: {
						channel: `${ch}`,
						gain: '0',
					},
					style: {
						bgcolor: ColorGreen,
						color: ColorBlack,
					},
				},
			],
		}
	}

	// ========================
	// Transmitter Status (ULX, QLX, AD)
	// ========================
	if (this.model.family != 'slx') {
		for (let ch = 1; ch <= this.model.channels; ch++) {
			presets[`ch_${ch}_tx_muted`] = {
				type: 'button',
				category: 'Transmitter Status',
				name: `Channel ${ch} TX Mute Status`,
				style: {
					text: `CH ${ch}\\nTX MUTE\\n$(shure-wireless:ch_${ch}_tx_mute_status)`,
					size: 'auto',
					color: ColorWhite,
					bgcolor: ColorBlack,
				},
				steps: [
					{
						down: [],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'transmitter_muted',
						options: {
							channel: `${ch}`,
						},
						style: {
							bgcolor: ColorDarkRed,
							color: ColorWhite,
						},
					},
				],
			}

			presets[`ch_${ch}_interference`] = {
				type: 'button',
				category: 'Transmitter Status',
				name: `Channel ${ch} Interference`,
				style: {
					text: `CH ${ch}\\nRF OK`,
					size: 'auto',
					color: ColorWhite,
					bgcolor: ColorGray,
				},
				steps: [
					{
						down: [],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'interference_status',
						options: {
							channel: `${ch}`,
						},
						style: {
							bgcolor: ColorRed,
							color: ColorWhite,
							text: `CH ${ch}\\nINTERF!`,
						},
					},
				],
			}
		}
	}

	// ========================
	// Flash Lights
	// ========================
	if (this.model.family != 'qlx') {
		presets['flash_lights'] = {
			type: 'button',
			category: 'Receiver',
			name: 'Flash Receiver Lights',
			style: {
				text: 'FLASH\\nLIGHTS',
				size: 'auto',
				color: ColorBlack,
				bgcolor: ColorYellow,
			},
			steps: [
				{
					down: [
						{
							actionId: 'flash_lights',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (this.model.family == 'ad' || this.model.family == 'slx') {
		for (let ch = 1; ch <= this.model.channels; ch++) {
			presets[`ch_${ch}_flash`] = {
				type: 'button',
				category: 'Receiver',
				name: `Flash Channel ${ch}`,
				style: {
					text: `FLASH\\nCH ${ch}`,
					size: 'auto',
					color: ColorBlack,
					bgcolor: ColorYellow,
				},
				steps: [
					{
						down: [
							{
								actionId: 'flash_channel',
								options: {
									channel: `${ch}`,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}
	}

	// ========================
	// AD-specific: Slot RF Output & Power
	// ========================
	if (this.model.family == 'ad') {
		for (let ch = 1; ch <= this.model.channels; ch++) {
			for (let slot = 1; slot <= this.model.slots; slot++) {
				let slotId = `${ch}:${slot}`

				presets[`slot_${ch}_${slot}_rf_on`] = {
					type: 'button',
					category: 'Slot RF Control',
					name: `Slot ${slotId} RF On`,
					style: {
						text: `${slotId}\\nRF ON`,
						size: 'auto',
						color: ColorWhite,
						bgcolor: ColorGray,
					},
					steps: [
						{
							down: [
								{
									actionId: 'slot_rf_output',
									options: {
										slot: slotId,
										onoff: 'RF_ON',
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'slot_rf_output',
							options: {
								slot: slotId,
								onoff: 'RF_ON',
							},
							style: {
								bgcolor: ColorGreen,
								color: ColorBlack,
							},
						},
					],
				}

				presets[`slot_${ch}_${slot}_rf_mute`] = {
					type: 'button',
					category: 'Slot RF Control',
					name: `Slot ${slotId} RF Mute`,
					style: {
						text: `${slotId}\\nRF MUTE`,
						size: 'auto',
						color: ColorWhite,
						bgcolor: ColorGray,
					},
					steps: [
						{
							down: [
								{
									actionId: 'slot_rf_output',
									options: {
										slot: slotId,
										onoff: 'RF_MUTE',
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'slot_rf_output',
							options: {
								slot: slotId,
								onoff: 'RF_MUTE',
							},
							style: {
								bgcolor: ColorRed,
								color: ColorWhite,
							},
						},
					],
				}

				presets[`slot_${ch}_${slot}_active`] = {
					type: 'button',
					category: 'Slot Status',
					name: `Slot ${slotId} Active`,
					style: {
						text: `SLOT\\n${slotId}`,
						size: 'auto',
						color: ColorWhite,
						bgcolor: ColorGray,
					},
					steps: [
						{
							down: [],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'slot_is_active',
							options: {
								slot: slotId,
							},
							style: {
								bgcolor: ColorGreen,
								color: ColorBlack,
							},
						},
					],
				}
			}
		}

		// RF Power presets per channel
		for (let ch = 1; ch <= this.model.channels; ch++) {
			for (const power of [
				{ id: 'LOW', label: 'LOW' },
				{ id: 'NORMAL', label: 'NORM' },
				{ id: 'HIGH', label: 'HIGH' },
			]) {
				presets[`ch_${ch}_rf_power_${power.id.toLowerCase()}`] = {
					type: 'button',
					category: 'Slot RF Control',
					name: `Channel ${ch} All Slots RF Power ${power.label}`,
					style: {
						text: `CH ${ch}\\nPWR\\n${power.label}`,
						size: 'auto',
						color: ColorWhite,
						bgcolor: ColorGray,
					},
					steps: [
						{
							down: [
								{
									actionId: 'slot_rf_power',
									options: {
										slot: `${ch}:0`,
										power: power.id,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [],
				}
			}
		}
	}

	return presets
}
