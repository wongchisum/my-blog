import styles from "./index.module.less";
import { NavBar } from "../NavBar";
import { Outlet,useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { getSeries } from "@/queries";
import { USER_ID } from "@/constants";
import type { QuerySeriesResult } from "@/types";
import { useMemo } from "react";

export function Layout() {

  const {id} = useParams()
  const { data } = useQuery<QuerySeriesResult>(getSeries, {
    variables: { id: USER_ID },
  });


  const series = useMemo(() => {
    return (data || [])?.publication?.seriesList?.edges
      .map((item) => {
        const itemId = item.node.posts.edges?.[0]?.node?.tags?.[0]?.id
        return {
          name: item.node.name,
          id: itemId,
          active:itemId === id
        };
      })
      .filter((item) => !!item.id);
  }, [data,id]);


  return (
    <>
      <NavBar title="Wong's Blog" items={series} />
      <div className={styles.layout}>
        <div className={styles.container}>
          <Outlet/>
        </div>
      </div>
    </>
  );
}
