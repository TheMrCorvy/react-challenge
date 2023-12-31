import { useState, useEffect } from "react"

import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Grid from "@mui/material/Grid"

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

import { lightBlue } from "@mui/material/colors"
import { useTheme } from "@mui/material/styles"

import splitIntoWeeks from "../../helper/splitIntoWeeks"

import { monthsOfYear, daysOfWeek } from "../../helper/constants"

const MiniCalendar = ({
	moveToLastMonth,
	moveToNextMonth,
	selectDate,
	datesList,
	selectedDate,
}) => {
	const [weeks, setWeeks] = useState([])
	const theme = useTheme()

	useEffect(() => {
		setWeeks(splitIntoWeeks(datesList))
	}, [datesList])

	const miniDay = (day) => (
		<Typography
			sx={{
				background: day.isToday ? lightBlue[700] : theme.palette.background.paper,
				textAlign: "center",
				fontSize: 12,
				lineHeight: "26px",
				padding: theme.spacing(0.2),
				borderStyle: "solid",
				textTransform: "capitalize",
				borderRadius: "50%",
				color: day.isToday ? "white" : "inherit",
				borderColor: theme.palette.background.paper,
				height: 35,
				width: 35,
				"&:hover": {
					backgroundColor: day.isToday ? lightBlue[800] : theme.palette.grey[100],
					cursor: "pointer",
				},
			}}
			onClick={() => selectDate(day.number)}
		>
			{day.number}
		</Typography>
	)

	return (
		<Grid container>
			<Grid item xs={12}>
				<Grid container direction="row" spacing={0}>
					<Grid
						item
						xs={3}
						container
						direction="row"
						justify="flex-end"
						alignItems="center"
						spacing={0}
						wrap="nowrap"
						sx={{
							mr: 0.5,
						}}
					>
						<Tooltip sx={{ mt: 2 }} title="Previous Month">
							<IconButton size="small" onClick={moveToLastMonth}>
								<ChevronLeftIcon />
							</IconButton>
						</Tooltip>{" "}
						<Tooltip sx={{ mt: 2 }} title="Next Month">
							<IconButton size="small" onClick={moveToNextMonth}>
								<ChevronRightIcon />
							</IconButton>
						</Tooltip>
					</Grid>
					<Grid
						item
						xs={8}
						sx={{
							textAlign: "center",
							verticalAlign: "bottom",
							alignItems: "end",
							flexGrow: 1,
							display: "flex",
							marginBottom: 0.5,
						}}
					>
						<Typography>
							{selectedDate && monthsOfYear[selectedDate.currentMonth]}{" "}
							{selectedDate && selectedDate.currentYear}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={0}>
					{daysOfWeek.map((weekDay, index) => (
						<Grid item xs key={`small-calendar-column-header-${index}`}>
							<Typography
								sx={{
									textAlign: "center",
									fontSize: 12,
									color: lightBlue[800],
									lineHeight: "26px",
									padding: theme.spacing(0.2),
									borderColor: theme.palette.background.paper,
									borderStyle: "solid",
									textTransform: "capitalize",
									background: theme.palette.background.paper,
								}}
							>
								{weekDay.substr(0, 1)}
							</Typography>
						</Grid>
					))}
				</Grid>
			</Grid>
			{weeks.map((week, weekIndex) => (
				<Grid item xs={12} key={`small-calendar-line-week-${weekIndex}`}>
					<Grid container spacing={0}>
						{week.map((day, dayIndex) => (
							<Grid
								item
								xs
								key={`small-calendar-line-week-${weekIndex}-day-${dayIndex}`}
							>
								{miniDay(day)}
							</Grid>
						))}
					</Grid>
				</Grid>
			))}
		</Grid>
	)
}

export default MiniCalendar
