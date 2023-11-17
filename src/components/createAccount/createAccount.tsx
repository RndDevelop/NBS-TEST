import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "./auth-components";
import { useQuery } from "react-query";
import "devextreme/dist/css/dx.light.css";
import { Lookup, DropDownOptions } from "devextreme-react/lookup";
import TextBox from "devextreme-react/text-box";
import "whatwg-fetch";
import "devextreme/data/array_store";
import { rollData } from "../api/rollApi";
import DataSource from "devextreme/data/data_source";
import { ValueChangedEvent } from "devextreme/ui/text_box_types";
import { ItemClickEvent } from "devextreme/ui/lookup";
import axios from "axios";
import { BASE_URL } from "../api/authApi";
import { Validator, EmailRule } from "devextreme-react/validator";
import { ValidatedEvent } from "devextreme/ui/validator";
import { useForm } from "react-hook-form";
import * as B from "react-bootstrap";

interface IRoll {
  seq: number;
  roll: string;
}

interface IDataSource {
  store: IRoll;
  key: string;
  group: string;
}

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [spot, setSpot] = useState<string>("");
  const [phon, setPhon] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bigo, setBigo] = useState<string>("");
  const [userYn, setUserYn] = useState<string>("");
  const [delYn, setDelYn] = useState<string>("");
  const [registant, setRegistant] = useState<string>("");
  const [registantTime, setRegistantTimne] = useState<string>("");
  const [modifier, setModifier] = useState<string>("");
  const [modifierTime, setModifierTime] = useState<string>("");
  const [error, setError] = useState<boolean>();
  const [errorMassage, setErrorMassage] = useState<string>("");
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState } = useForm();
  const { data } = useQuery<IRoll[]>("roll", () => rollData(), {
    refetchInterval: false,
  });

  const groupData = new DataSource<IDataSource>({
    store: data,
    key: "seq",
    group: "roll",
  });

  const onClickJoin = (data: any) => {
    console.log(data);
  };

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const {
  //     target: { name, value },
  //   } = e;

  //   if (name === "name") {
  //     setName(value);
  //   } else if (name === "email") {
  //     setEmail(value);
  //   } else if (name === "password") {
  //     setPassword(value);
  //   } else if (roll === "roll") {
  //     setRoll(value);
  //   }
  // };

  //회원가입 파이어 베이스
  // const fireOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setError("");
  //   if (isLoading || name === "" || email === "" || password === "") return;
  //   try {
  //     setLoading(true);
  //     const credentials = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     console.log(credentials.user);
  //     await updateProfile(credentials.user, {
  //       displayName: name,
  //     });
  //     navigate("/");
  //   } catch (e) {
  //     if (e instanceof FirebaseError) {
  //       setError(e.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const userIdLabel = { "aria-label": "userId" };
  const passwordLabel = { "aria-label": "password" };
  const groupedLookupLabel = { "aria-label": "Groupe" };
  const spotLabel = { "aria-label": "spot" };
  const phoneLabel = { "aria-label": "phone" };
  const tellLabel = { "aria-label": "tell" };
  const emailLabel = { "aria-label": "email" };
  const bigoLabel = { "aria-label": "bigo" };
  const userYnLabel = { "aria-label": "userYn" };
  const delYnLabel = { "aria-label": "delYn" };
  const registantLabel = { "aria-label": "registant" };
  const registantTimeLabel = { "aria-label": "registantTime" };
  const modifierLabel = { "aria-label": "modifier" };
  const modifierTimeLabel = { "aria-label": "modifierTime" };

  const onChangeEvent = (e: ValueChangedEvent) => {
    if (e.event?.currentTarget.ariaLabel === "userId") {
      setUserId(e.value);
    }
    if (e.event?.currentTarget.ariaLabel === "password") {
      setPassword(e.value);
    }
    if (e.event?.currentTarget.ariaLabel === "spot") {
      setSpot(e.value);
    }
    if (e.event?.currentTarget.ariaLabel === "phone") {
      setPhon(e.value);
    }
    if (e.event?.currentTarget.ariaLabel === "tell") {
      setTel(e.value);
    }
    if (e.event?.currentTarget.ariaLabel === "email") {
      setEmail(e.value);
    }
    if (e.event?.currentTarget.ariaLabel === "bigo") {
      setBigo(e.value);
    }
    if (e.event?.currentTarget.ariaLabel === "userYn") {
      setUserYn(e.value);
    }
    if (e.event?.currentTarget.ariaLabel === "delYn") {
      setDelYn(e.value);
    }
    if (e.event?.currentTarget.ariaLabel === "registant") {
      setRegistant(e.value);
    }
    if (e.event?.currentTarget.ariaLabel === "registantTime") {
      setRegistantTimne(e.value);
    }
    if (e.event?.currentTarget.ariaLabel === "modifier") {
      setModifier(e.value);
    }
    if (e.event?.currentTarget.ariaLabel === "modifierTime") {
      setModifierTime(e.value);
    }
  };

  const onLookUpValue = (value: ItemClickEvent) => {
    setGroup(value.itemData.roll);
  };

  const onAccoutUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userId === "" || password === "" || group === "") {
      console.log("회원가입 안됨 ");
      if (error === false) {
        setErrorMassage("이메일 주소가 정확하지 않습니다. ");
      }
      return;
    } else {
      const body = {
        userId: userId,
        password: password,
        group: group,
        email: email,
        spot: spot,
        tel: tel,
        phone: phon,
        bigo: bigo,
        userYn: userYn,
        del: delYn,
        registant: registant,
        registantTime: registantTime,
        modifier: modifier,
        modifierTime: modifierTime,
      };

      await axios
        .post(BASE_URL + "/createaccount", body)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((error) => console.log(error));
    }
  };

  const onValidatedEvent = (e: ValidatedEvent) => {
    setError(e.isValid);
  };
  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={onAccoutUser}>
        <TextBox
          placeholder="userId"
          onValueChanged={onChangeEvent}
          inputAttr={userIdLabel}
          style={{ borderRadius: "50px" }}
          {...(register("userId"), { required: true, maxLength: 20 })}
        />
        <TextBox
          placeholder="password"
          onValueChanged={onChangeEvent}
          inputAttr={passwordLabel}
          style={{ borderRadius: "50px" }}
        />

        <TextBox
          placeholder="spot"
          onValueChanged={onChangeEvent}
          // onChange={onChangeEvent}
          inputAttr={spotLabel}
          style={{ borderRadius: "50px" }}
        />
        <TextBox
          placeholder="phone"
          onValueChanged={onChangeEvent}
          // onChange={onChangeEvent}
          inputAttr={phoneLabel}
          style={{ borderRadius: "50px" }}
        />
        <TextBox
          placeholder="tell"
          onValueChanged={onChangeEvent}
          // onChange={onChangeEvent}
          inputAttr={tellLabel}
          style={{ borderRadius: "50px" }}
        />
        <TextBox
          placeholder="email"
          onValueChanged={onChangeEvent}
          // onChange={onChangeEvent}
          inputAttr={emailLabel}
          style={{ borderRadius: "50px" }}
        >
          <Validator name="Mail address" onValidated={onValidatedEvent}>
            <EmailRule message="이메일 주소가 정확하지 않습니다." />
          </Validator>
        </TextBox>
        <TextBox
          placeholder="bigo"
          onValueChanged={onChangeEvent}
          // onChange={onChangeEvent}
          inputAttr={bigoLabel}
          style={{ borderRadius: "50px" }}
        />
        <TextBox
          placeholder="userYn"
          onValueChanged={onChangeEvent}
          // onChange={onChangeEvent}
          inputAttr={userYnLabel}
          style={{ borderRadius: "50px" }}
        />
        <TextBox
          placeholder="delYn"
          onValueChanged={onChangeEvent}
          // onChange={onChangeEvent}
          inputAttr={delYnLabel}
          style={{ borderRadius: "50px" }}
        />
        <TextBox
          placeholder="registrant"
          onValueChanged={onChangeEvent}
          // onChange={onChangeEvent}
          inputAttr={registantLabel}
          style={{ borderRadius: "50px" }}
        />
        <TextBox
          placeholder="registTime"
          onValueChanged={onChangeEvent}
          // onChange={onChangeEvent}
          inputAttr={registantTimeLabel}
          style={{ borderRadius: "50px" }}
        />
        <TextBox
          placeholder="modifier"
          onValueChanged={onChangeEvent}
          // onChange={onChangeEvent}
          inputAttr={modifierLabel}
          style={{ borderRadius: "50px" }}
        />
        <TextBox
          placeholder="modifierTime"
          onValueChanged={onChangeEvent}
          // onChange={onChangeEvent}
          inputAttr={modifierTimeLabel}
          style={{ borderRadius: "50px" }}
        />

        <div>
          <Lookup
            dataSource={groupData}
            grouped={true}
            displayExpr="roll"
            inputAttr={groupedLookupLabel}
            style={{ borderRadius: "50px" }}
            placeholder="GROUP"
            name="roll"
            onItemClick={onLookUpValue}
          >
            <DropDownOptions
              hideOnOutsideClick={true}
              showTitle={false}
              titleTemplate={"roll"}
            />
          </Lookup>
        </div>
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error === false ? <Error>{errorMassage}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
