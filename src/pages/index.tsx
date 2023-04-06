import { FC, useState, FormEvent, useEffect, useContext } from "react";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

import { Form, Box } from "@/components/Form";
import { useNavigate } from "react-router-dom";
import { Input, TextArea } from "@/components/Input";
import Button from "@/components/Button";
import { Spinner } from "@/components/Loading";
import { UserType, completedType } from "@/utils/types/user";
import Layout from "@/components/Layout";
import { useTitle } from "@/utils/hooks";
import { Card } from "@/components/Card";
import Swal from "@/utils/swal";
import { ThemeContext } from "@/utils/context";

// interface INPUT
interface objSubmitType {
  content: string;
  description: string;
  priority: string;
}

const Home: FC = () => {
  // INPUT
  const [objSubmit, setObjSubmit] = useState<objSubmitType>({
    content: "",
    description: "",
    priority: "2",
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { theme, setTheme } = useContext(ThemeContext);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  //TAMPIL
  const [datas, setDatas] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useTitle("Homepage | User Management");
  let token = "5b14ff8f5f4ae0031083d8e861ec12c59c48339b";

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response;
        setDatas(data);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  // INPUT
  useEffect(() => {
    const isEmpty = Object.values(objSubmit).every((val) => val !== "");
    setIsDisabled(!isEmpty);
  }, [objSubmit]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDisabled(true);
    axios
      .post("tasks", objSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { data, message } = response.data;
        MySwal.fire({
          title: "Success",
          text: message,
          icon: "success",
          background: theme === "dark" ? "#475569" : "#f1f5f9",
          color: theme === "dark" ? "#e2e8f0" : "#0f172a",
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
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
          background: theme === "dark" ? "#475569" : "#f1f5f9",
          color: theme === "dark" ? "#e2e8f0" : "#0f172a",
        });
      })
      .finally(() => setIsDisabled(false));
  }

  return (
    <Layout>
      <div className="flex flex-col items-center gap-4 w-[85%] w-lg-[80%] h-[90%]">
        <Form>
          <div className="w-full flex flex-col items-center gap-1 p-5">
            <p className=" text-xl text-slate-900 dark:text-slate-200 font-bold tracking-wider">
              Task Input:
            </p>
            <form
              className="flex flex-col items-center content-center gap-3 w-full"
              onSubmit={(event) => handleSubmit(event)}
            >
              <Input
                placeholder="Your Todo"
                id="input-content"
                onChange={(event) =>
                  setObjSubmit({ ...objSubmit, content: event.target.value })
                }
              />
              <TextArea
                placeholder="your description here"
                id="input-description"
                onChange={(event) =>
                  setObjSubmit({
                    ...objSubmit,
                    description: event.target.value,
                  })
                }
              />
              <Button
                label="SUBMIT"
                id="button-login"
                type="submit"
                disabled={isDisabled}
              />
            </form>
          </div>
        </Form>
        <Form>
          <div className="w-full flex flex-col items-center gap-4 min-h-[60%]">
            <p className=" text-xl text-slate-900 dark:text-slate-200 font-bold tracking-wider">
              Task List:
            </p>

            <div className="grid gap-2 p-5 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-[90%]">
              {loading ? (
                <Spinner />
              ) : (
                datas.map((data, idx) => {
                  return (
                    <Box>
                      <Card
                        key={idx}
                        content={data.content}
                        description={data.description}
                        priority={data.priority}
                        id={data.id}
                      />
                    </Box>
                  );
                })
              )}
            </div>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Home;
