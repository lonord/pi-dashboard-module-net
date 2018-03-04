import { Dialog, DialogProps } from '@lonord/react-electron-components'
import * as React from 'react'
import styled from 'styled-components'

export interface DetailDialogProps extends DialogProps {
	onSelectInterface(ifName: string)
	selectedInterface: string
}

export default class DetailDialog extends React.Component<DetailDialogProps, any> {
	render() {
		const { selectedInterface, onSelectInterface, ...rest } = this.props
		return (
			<Dialog {...rest} title="路由器网速">
				<div>123</div>
			</Dialog>
		)
	}
}
