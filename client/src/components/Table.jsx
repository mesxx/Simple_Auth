import React, { useContext, useEffect } from "react";
import { Table } from "flowbite-react";
import { GlobalContext } from "../context/GlobalContext";
import * as moment from "moment";

export default function Tables() {
  const { state, handleFunction } = useContext(GlobalContext);
  const { logData } = state;
  const { fetchDataLogged } = handleFunction;

  useEffect(() => {
    fetchDataLogged();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Last Login</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {logData?.data?.map((el, i) => {
            return (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {i + 1}
                </Table.Cell>
                <Table.Cell>
                  {moment(el.createdAt).locale("ID").format("LLLL")}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
