import { Router } from "express";
import fs from "fs";
import { getActiveUsers, getLogs, post, deleteLogs, postServer, getServer, postLevel, getLevel, getUsersByYear, getUsersByBranch } from "../controllers/log.controller.js";

const holidays = JSON.parse(
  fs.readFileSync(new URL("../data/holidays.json", import.meta.url), "utf-8")
);

const logRouter = Router();

logRouter.get('/getholiadys', (req, res) => {
  const { year, month } = req.query;
  let results = holidays;

  if (year) {
    results = results.filter((holiday) => holiday.date.startsWith(String(year)));
  }

  if (month) {
    const formattedMonth = String(month).length === 1 ? `0${month}` : String(month);
    results = results.filter((holiday) => {
      if (formattedMonth.includes('-')) {
        return holiday.date.startsWith(formattedMonth);
      }
      return holiday.date.split('-')[1] === formattedMonth;
    });
  }

  res.status(200).json(results);
});

logRouter.post('/log', post)
logRouter.get('/getLogs', getLogs);
logRouter.get('/totalUsers', getActiveUsers);
logRouter.get('/getByYear/:year', getUsersByYear);
logRouter.get('/getByBranch/:branch', getUsersByBranch);
logRouter.delete('/delete', deleteLogs);
logRouter.post('/fixServer', postServer);
logRouter.get('/getServer', getServer);
logRouter.post('/postLevel', postLevel)
logRouter.post('/getLevel', getLevel)

export default logRouter;
