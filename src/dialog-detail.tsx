import { SelectableArea, SubTitle } from '@lonord/pi-dashboard-components'
import createRPCClient, { RPCClient } from '@lonord/pi-status-rpc-client'
import { FlexHorizental, FlexItemAdaptive } from '@lonord/react-electron-components'
import * as React from 'react'
import styled from 'styled-components'
import { SpeedArea, SpeedSignArea } from './layouts'

export interface DetailProps {
	onSelectInterface(ifName: string)
	selectedInterface: string
	rpcBaseUrl: string
	sendSpeedStr: string
	recvSpeedStr: string
	nameAlias: { [x: string]: string }
}

interface DetailDialogState {
	ifNames: string[]
	ifNamesLoaded: boolean
}

export default class Detail extends React.Component<DetailProps, DetailDialogState> {

	state: DetailDialogState = {
		ifNames: [],
		ifNamesLoaded: false
	}

	componentDidMount() {
		const { rpcBaseUrl } = this.props
		if (rpcBaseUrl) {
			createRPCClient(rpcBaseUrl).httpGet('net-interface').then((result) => {
				this.setState({
					ifNames: result,
					ifNamesLoaded: true
				})
			}).catch(console.error)
		}
	}

	render() {
		const { selectedInterface, onSelectInterface, sendSpeedStr, recvSpeedStr, nameAlias, ...rest } = this.props
		const { ifNames, ifNamesLoaded } = this.state
		const alias = nameAlias || {}
		return (
			<div>
				<SubTitle>选择网卡</SubTitle>
				{!ifNamesLoaded
					? <LoadingText>获取中...</LoadingText>
					: <div>
						{ifNames.map((name, idx) => (
							<IfNameItem key={idx}
								isSelected={name === selectedInterface}
								onClick={() => onSelectInterface && onSelectInterface(name)}>
								<IfNameItemText>{alias[name]
									? `${alias[name]}(${name})`
									: name}</IfNameItemText>
								{name === selectedInterface
									? <IfSpeedArea>
										<IfSpeedTag>SEND</IfSpeedTag>
										<IfSpeedValue>{sendSpeedStr}</IfSpeedValue>
										<IfSpeedTag>RECV</IfSpeedTag>
										<IfSpeedValue>{recvSpeedStr}</IfSpeedValue>
									</IfSpeedArea>
									: null}
							</IfNameItem>
						))}
					</div>}
			</div>
		)
	}
}

const LoadingText = styled.div`
	height: 40px;
	line-height: 40px;
	font-size: 12px;
	color: #ccc;
	text-align: center;
`

const IfNameItem = styled(SelectableArea) `
	cursor: pointer;
	padding: 8px;
	color: #666;
`

const IfNameItemText = styled.div`
	font-size: 14px;
`

const IfSpeedArea = FlexHorizental.extend`
	margin: 8px 4px 4px;
	color: #999;
`

const IfSpeedTag = styled(SpeedSignArea) `
	font-size: 12px;
	text-align: right;
`

const IfSpeedValue = styled(SpeedArea) `
	padding-right: 12px;
	font-size: 12px;
	width: 100px;
`
