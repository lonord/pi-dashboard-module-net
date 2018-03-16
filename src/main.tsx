import { Title, withSSEClient } from '@lonord/pi-dashboard-components'
import createRPCClient, { RPCClient, SSEClient } from '@lonord/pi-status-rpc-client'
import { Button, Dialog } from '@lonord/react-electron-components'
import * as React from 'react'
import styled from 'styled-components'
import DetailDialog from './dialog-detail'
import Detail from './dialog-detail'
import { name as displayName } from './index'
import { SpeedArea, SpeedAreaWrap, SpeedIndicator, SpeedSignArea } from './layouts'
import formatSpeedUnit from './util/speed-formatter'

interface MainPropsMap {
	selectedIfName: string
	rpcBaseUrl: string
	nameAlias: { [x: string]: string }
	speedData: { send: number, receive: number }
}

interface MainProps extends MainPropsMap {
	updateProps: <K extends keyof MainPropsMap>(props: Pick<MainPropsMap, K>) => void
}

interface MainState {
	isDetailOpen: boolean
}

class Main extends React.Component<MainProps, MainState> {

	rpcService: RPCClient = null
	sseClient: SSEClient = null

	state: MainState = {
		isDetailOpen: false
	}

	openDetail = () => {
		this.setState({
			isDetailOpen: true
		})
	}

	closeDetail = () => {
		this.setState({
			isDetailOpen: false
		})
	}

	updateIfName = (ifName: string) => {
		this.props.updateProps({
			selectedIfName: ifName
		})
	}

	render() {
		const { selectedIfName, rpcBaseUrl, nameAlias, speedData } = this.props
		const { isDetailOpen } = this.state
		const sendSpeed = speedData && speedData.send || 0
		const receiveSpeed = speedData && speedData.receive || 0
		const sendSpeedLevel = calculateSpeedLevel(sendSpeed)
		const recvSpeedLevel = calculateSpeedLevel(receiveSpeed)
		const sendSpeedStr = formatSpeedUnit(sendSpeed)
		const recvSpeedStr = formatSpeedUnit(receiveSpeed)
		const alias = nameAlias || {}
		const displayIfName = alias[selectedIfName]
			? alias[selectedIfName]
			: selectedIfName
		return (
			<FullSizeWrap onClick={this.openDetail}>
				<Title>{displayName + ' - ' + displayIfName}</Title>
				<SpeedAreaWrap>
					<SpeedSignArea>SEND</SpeedSignArea>
					<SpeedArea>{sendSpeedStr}</SpeedArea>
					<SpeedIndicator trafficStatus={sendSpeedLevel}/>
				</SpeedAreaWrap>
				<SpeedAreaWrap>
					<SpeedSignArea>RECV</SpeedSignArea>
					<SpeedArea>{recvSpeedStr}</SpeedArea>
					<SpeedIndicator trafficStatus={recvSpeedLevel} />
				</SpeedAreaWrap>
				<Dialog isOpen={isDetailOpen} onClose={this.closeDetail} title={displayName}>
					<Detail
						selectedInterface={selectedIfName}
						onSelectInterface={this.updateIfName}
						rpcBaseUrl={rpcBaseUrl}
						sendSpeedStr={sendSpeedStr}
						recvSpeedStr={recvSpeedStr}
						nameAlias={nameAlias} />
				</Dialog>
			</FullSizeWrap>
		)
	}
}

export default withSSEClient(Main, 'net-iostat', (p) => ({ ifName: p.selectedIfName }), 'speedData')

function calculateSpeedLevel(n: number) {
	return n < 1024 * 50 ? 'free' : n < 1024 * 1024 ? 'medium' : 'busy'
}

const FullSizeWrap = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
`
