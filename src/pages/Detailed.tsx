import React, { FC, FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

import { Form, Box } from "@/components/Form";
import { UserType } from "@/utils/types/user";
import { Input, TextArea } from "@/components/Input";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Swal from "@/utils/swal";
import { Card, Detail } from "@/components/Card";

const Detailed: FC = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<UserType>>({});
  const [data, setData] = useState<UserType>({
    content: "",
    description: "",
    priority: 0,
    id: "",
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const params = useParams<{ detail: string }>();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  let token = "5b14ff8f5f4ae0031083d8e861ec12c59c48339b";

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const { detail: id } = params;
    axios
      .get(`tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response;
        document.title = `${data.content}`;
        setData(data);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  function handleChange(value: any, key: keyof typeof objSubmit) {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { detail: id } = params;
    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key] as string);
    }
    axios
      .post(`tasks/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        MySwal.fire({
          title: "Success",
          text: message,
          icon: "success",
          showCancelButton: false,
        });
        setObjSubmit({});
        setIsEdit(false);
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
          icon: "error",
        });
      })
      .finally(() => fetchData());
  }

  const handleDelete = () => {
    const { detail: id } = params;
    axios
      .delete(`tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { message } = response.data;
        MySwal.fire({
          title: "Delete task",
          text: "Are you sure?",
          icon: "warning",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
          icon: "error",
        });
      });
  };

  return (
    <Layout>
      <div className="w-[70%] h-[90%] md:h-[80%] ">
        <Box>
          {" "}
          <div className="flex flex-col gap-4 p-3 justify-center items-center w-full h-min">
            <p className=" text-xl text-slate-900 dark:text-slate-200 font-bold tracking-wider">
              Detail:
            </p>
            {isEdit ? (
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className="flex flex-col gap-3 w-full h-full">
                  <div className="flex flex-col md:flex-row gap-2">
                    <Input
                      placeholder="Your Todo"
                      id="input-content"
                      defaultValue={data.content}
                      onChange={(event) =>
                        handleChange(event.target.value, "content")
                      }
                    />
                    <Input
                      placeholder="(type 1 to comleted tasks)"
                      id="input-content"
                      onChange={(event) =>
                        handleChange(event.target.value, "priority")
                      }
                    />
                  </div>
                  <TextArea
                    placeholder="your description here"
                    id="input-description"
                    defaultValue={data.description}
                    onChange={(event) =>
                      handleChange(event.target.value, "description")
                    }
                  />
                  <div className="flex flex-col gap-4">
                    <Button label="Submit" id="button-submit" type="submit" />
                  </div>
                </div>
              </form>
            ) : (
              <div className=" text-center w-full ">
                <Detail
                  content={data.content}
                  description={data.description}
                  priority={data.priority}
                  id={data.id}
                />
              </div>
            )}
          </div>
          <div className="flex flex-row p-3 justify-center items-center gap-2">
            <Button
              label="Back to home"
              id="nav-home"
              onClick={() => navigate("/")}
            />

            <Button
              label="Edit Task"
              id="button-edit"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            />

            <Button
              label="Delete Task"
              id="button-delete"
              onClick={() => handleDelete()}
            />
          </div>
        </Box>
      </div>
    </Layout>
  );
};

export default Detailed;
