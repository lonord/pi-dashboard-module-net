export default function formatSpeedUnit(n: number) {
	if (n < 0) {
		return '-- KB/s'
	}
	let s = null
	let unit = null
	if (n > 1024 * 1024) {
		s = n / 1024 / 1024 + ''
		unit = ' MB/s'
	} else {
		s = n / 1024 + ''
		unit = ' KB/s'
	}
	const idx = s.indexOf('.')
	if (idx !== -1) {
		s += '00'
		s = s.substr(0, idx + 3)
	} else {
		s += '.00'
	}
	return s + unit
}
