import styles from "./index.module.less";
import { NavBar } from "../NavBar";
import { Outlet, useNavigate,useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { getSeries } from "@/queries";
import { USER_ID } from "@/constants";
import type { QuerySeriesResult } from "@/types";
import { useMemo } from "react";

export function Layout() {
  const nav = useNavigate();
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

  // 点击事件
  const handleNavClick = (type: string, id: string) => {
    if (type === "home") {
      nav("/");
    } else if (type == "talks") {
      nav("/talks");
    } else {
      nav(`/posts/${id}`);
    }
  };

  return (
    <>
      <NavBar title="Wong" items={series} onNavClick={handleNavClick} />
      <div className={styles.layout}>
        <div className={styles.container}>
          <Outlet/>
        </div>
      </div>
    </>
  );
}
