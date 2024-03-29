import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ResultBlock } from '../../../../components/ResultBlock/ResultBlock'
import { Dispatch, ProState } from '../../../../store/store'
import { store } from '../../../../../store/store'
import classes from '../../../style/pages.module.scss'

const typesFl = {
	1: '1-1',
	2: '2-3',
	3: '4-5',
}

type Props = {}

export const ResultSnp: FC<Props> = () => {
	const stfl = useSelector((state: ProState) => state.addit.stfl)
	const materials = useSelector((state: ProState) => state.addit.addit?.materials) || []
	const fillers = useSelector((state: ProState) => state.addit.addit?.fillers) || []
	const graphite = useSelector((state: ProState) => state.addit.addit?.graphite) || []
	const mods = useSelector((state: ProState) => state.addit.addit?.mod) || []
	const typeFl = useSelector((state: ProState) => state.addit.typeFl)

	const snp = useSelector((state: ProState) => state.snp.snp)
	const size = useSelector((state: ProState) => state.snp.size)
	const st = useSelector((state: ProState) => state.snp.st)

	const grap = useSelector((state: ProState) => state.snp.grap)
	const filler = useSelector((state: ProState) => state.snp.filler)
	const mod = useSelector((state: ProState) => state.snp.mod)

	const pn = useSelector((state: ProState) => state.snp.pn)
	const dn = useSelector((state: ProState) => state.snp.dn)

	const h = useSelector((state: ProState) => state.snp.h)
	const oh = useSelector((state: ProState) => state.snp.oh)

	const fr = useSelector((state: ProState) => state.snp.fr)
	const ir = useSelector((state: ProState) => state.snp.ir)
	const or = useSelector((state: ProState) => state.snp.or)

	const isMoun = useSelector((state: ProState) => state.snp.isMoun)
	const moun = useSelector((state: ProState) => state.snp.moun)
	const isJumper = useSelector((state: ProState) => state.snp.isJumper)
	const jumper = useSelector((state: ProState) => state.snp.jumper)
	const jumWidth = useSelector((state: ProState) => state.snp.jumWidth)
	const isHole = useSelector((state: ProState) => state.snp.isHole)

	const drawing = useSelector((state: ProState) => state.snp.drawing)

	const isOrderCreated = useSelector((state: ProState) => state.list.isOrderCreated)
	const orderId = useSelector((state: ProState) => state.list.orderId)

	const dispatch = useDispatch<Dispatch>()

	const resultHandler = async (count: string, designation: string, description: string) => {
		let sizes = ''
		if (size?.d4) sizes += size.d4 + 'x'
		sizes += `${size!.d3}x${size!.d2}`
		if (size?.d1) sizes += 'x' + size.d1

		if (!isOrderCreated) {
			await dispatch.list.createOrder({
				order: { count: 0, userId: store.getState().user.userId },
				position: {
					designation,
					count,
					sizes,
					drawing: drawing?.name || '',
					description,
					orderId,
				},
			})
		}

		if (orderId) {
			await dispatch.list.addPosition({
				designation,
				count,
				sizes,
				drawing: drawing?.name || '',
				description,
				orderId,
			})
			dispatch.snp.setDrawing(null)
		}
	}

	const createDescr = (): string => {
		if (!size) return ''

		const s = stfl.find(s => s.id === st)

		let matFr = ''
		let matIr = ''
		let matOr = ''
		materials.forEach(m => {
			if (m.short === fr) matFr = m.title
			if (m.short === ir) matIr = m.title
			if (m.short === or) matOr = m.title
		})

		let rings
		switch (snp?.typePr) {
			case 'Д':
				rings = `(с наружным ${matOr} и внутренним ${matIr} ограничительными кольцами), с металлическим каркасом из ленты ${matFr}`
				break
			case 'Г':
				rings = `(с наружным ограничительным кольцом ${matOr}), с металлическим каркасом из ленты ${matFr}`
				break
			case 'В':
				rings = `(с внутренним ограничительным кольцом ${matIr}), с металлическим каркасом из ленты ${matFr}`
				break
			case 'Б':
				rings = `(без ограничительных колец), с металлическим каркасом из ленты ${matFr}`
				break
			case 'А':
				rings = `(без ограничительных колец), с металлическим каркасом из ленты ${matFr}`
				break
		}
		const fil = fillers.find(f => f.short === filler)?.description

		const tfl = typeFl.find(t => t.id === snp?.typeFlId)

		let sizes = ''
		if (size?.d4) sizes += size.d4 + '*'
		sizes += `${size.d3}*${size.d2}`
		if (size?.d1) sizes += '*' + size.d1

		let thick = h
		if (h === 'др.') thick = oh

		let modif = ''
		if (mod !== '0') {
			let m = mods.find(m => m.id === mod)?.description
			if (m) modif = `, с добавлением ${m}`
		}
		let mount = ''
		if (isMoun) mount = `, с фиксатором ${moun}`

		let hole = ''
		if (isHole) hole = `, с отверстиями (по чертежу)`

		let jum = ''
		if (isJumper) {
			let width = ''
			if (jumWidth !== '') width = ` шириной ${jumWidth} мм`
			jum = `, с перемычкой типа ${jumper}${width}`
		}

		let fl = s?.flange ? ` по ${s?.flange}` : ''

		let res = `Спирально-навитая прокладка (СНП) по ${s?.stand} типа ${snp?.typePr} ${rings} и наполнителем из ${fil}, для применения на фланце "${tfl?.title}"${fl} с размерами ${sizes}, толщиной ${thick} мм${mount}${hole}${jum}`
		return res
	}

	const createDesig = (): string => {
		let res: string = ''
		const s = stfl.find(s => s.id === st)

		let py = pn.split(' ')[0]

		let thick = h
		if (h === 'др.') thick = oh

		let mater = ''
		let isDef = true
		if (ir) {
			if (ir !== snp?.ir.default) isDef = false
		}
		if (or) {
			if (or !== snp?.or.default) isDef = false
		}
		if (fr) {
			if (fr !== snp?.frame.default) isDef = false
		}

		let elem = ''
		let elems = []
		if (isJumper) {
			if (jumWidth) elems.push(`${jumper}/${jumWidth}`)
			else elems.push(jumper)
		}
		if (isMoun) elems.push(moun)
		if (isHole || drawing) elems.push('черт.')
		if (elems.length) elem = ` (${elems.join(', ')})`

		switch (s?.standId) {
			case '1':
				res = `СНП-${snp?.typePr}-${filler}-${size?.d2}-${py}-${thick}${mater}${elem} ${s.stand}`
				break
			case '2':
				py = pn.split(' ')[1].replaceAll('(', '').replaceAll(')', '')
				res = `СНП-${snp?.typePr}-${typesFl[snp?.typeFlId as '1']}-${dn}-${py}${mater}${elem} ${s.stand}`
				break
			case '3':
				thick = ''
				if (h === 'др.') thick = `-${oh}`
				let stand = s.stand
				if (s.flangeId === '4' || s.flangeId === '5') stand = s.flange
				let fil = 'F.G.'
				if (filler === '5') fil = 'PTFE'
				res = `СНП-${snp?.typePr}-${dn}"-${py}#-${fil}${thick}${mater}${elem} ${stand}`
				break
			case '4':
				thick = ''
				fil = 'F.G.'
				if (filler === '5') fil = 'PTFE'
				if (h === 'др.') thick = `-${oh}`
				res = `СНП-${snp?.typePr}-${dn}"-${py}#-${fil}${thick}${mater}${elem} ${s.stand}`
				break
			case '5':
				thick = ''
				fil = 'F.G.'
				if (filler === '5') fil = 'PTFE'
				if (h === 'др.') thick = `-${oh}`
				res = `СНП-${snp?.typePr}-${dn}-${py}-${fil}${thick}${mater}${elem} ${s.stand}`
				break
			case '6':
				if (!isDef) {
					mater = `-${ir || '0'}${fr}${or || '0'}`
				}
				let sizes = ''
				if (size?.d4) sizes += size.d4 + 'x'
				sizes += `${size?.d3}x${size?.d2}`
				if (size?.d1) sizes += 'x' + size.d1
				res = `СНП-${snp?.typePr}-${filler}-${sizes}-${thick}${mater}${elem} ${s.stand}`
				break
		}
		return res
	}

	return (
		<ResultBlock
			className={classes.resultContainer}
			description={createDescr()}
			designation={createDesig()}
			addDesignation={resultHandler}
		/>
	)
}
