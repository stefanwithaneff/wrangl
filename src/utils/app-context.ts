import { produce } from "immer";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  Context,
} from "react";
import { v4 as uuidv4 } from "uuid";

import { App } from "../types/App";
import { Applications } from "./db";

type ContextExtractor<C> = C extends Context<infer O> ? O : never;

type AppWithoutGeneratedData = Omit<App, "createdTimestamp" | "id">;

function decorateCreatedApp(app: AppWithoutGeneratedData): App {
  return {
    ...app,
    id: uuidv4(),
    createdTimestamp: new Date().toISOString(),
  };
}

export const AppContext = createContext({
  apps: [] as ReadonlyArray<App>,
  inProgress: true,
  create: (app: AppWithoutGeneratedData) => {},
  update: (id: string, payload: App) => {},
  delete: (id: string) => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

function useAppIDB() {
  const [inProgress, setInProgress] = useState(true);
  const [apps, setApps] = useState([] as ReadonlyArray<App>);

  useEffect(() => {
    Applications.getAllApplications().then((allApps) => {
      setApps(allApps);
      setInProgress(false);
    });
  }, [setApps, setInProgress]);

  return { apps, inProgress, setApps };
}

export function useAppState(): ContextExtractor<typeof AppContext> {
  const { apps, inProgress, setApps } = useAppIDB();

  const createApp = useCallback(
    (app: AppWithoutGeneratedData) => {
      const decoratedApp = decorateCreatedApp(app);
      setApps((apps) => [...apps, decoratedApp]);
      try {
        Applications.create(decoratedApp);
      } catch {}
    },
    [setApps]
  );

  const updateApp = useCallback(
    (id: string, app: App) => {
      setApps((apps) =>
        produce(apps, (appList) => {
          const appIndex = appList.findIndex((app) => app.id === id);
          appList[appIndex] = app;
        })
      );
    },
    [setApps]
  );

  const deleteApp = useCallback(
    (id: string) => {
      setApps((apps) =>
        produce(apps, (appList) => {
          const appIndex = appList.findIndex((app) => app.id === id);
          appList.splice(appIndex, 1);
        })
      );
    },
    [setApps]
  );

  return {
    apps,
    inProgress,
    create: createApp,
    update: updateApp,
    delete: deleteApp,
  };
}
