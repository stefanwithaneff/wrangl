import React from "react";

import {
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";

import { useAppContext } from "../../utils/app-context";
import { App } from "../../types/App";

function AppListBody({ apps }: { apps: ReadonlyArray<App> }) {
  const numColumns = 4;

  if (apps.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={numColumns}>
            You have not tracked any applications yet
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {apps.map((app) => (
        <TableRow key={app.id}>
          <TableCell>{app.title}</TableCell>
          <TableCell>{app.company}</TableCell>
          <TableCell>{app.location}</TableCell>
          <TableCell>{app.url}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export function AppList() {
  const { apps } = useAppContext();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>URL</TableCell>
          </TableRow>
        </TableHead>
        <AppListBody apps={apps}></AppListBody>
      </Table>
    </TableContainer>
  );
}
