import { produce } from "immer";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  Context,
} from "react";
import { v4 as uuidv4 } from "uuid";

import { App } from "../types/App";

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
  create: (app: AppWithoutGeneratedData) => {},
  update: (id: string, payload: App) => {},
  delete: (id: string) => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

export function useAppState(): ContextExtractor<typeof AppContext> {
  const [apps, setApps] = useState([] as ReadonlyArray<App>);

  const createApp = useCallback(
    (app: AppWithoutGeneratedData) => {
      setApps((apps) => [...apps, decorateCreatedApp(app)]);
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
    create: createApp,
    update: updateApp,
    delete: deleteApp,
  };
}
