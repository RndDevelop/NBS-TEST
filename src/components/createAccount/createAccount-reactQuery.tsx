import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
  ErrorElement,
  ErrorP,
  LookUpSelect,
} from "./auth-components";
import { useMutation, useQuery } from "react-query";
import "devextreme/dist/css/dx.light.css";
import "whatwg-fetch";
import "devextreme/data/array_store";
import { rollData, userPosition } from "../api/rollApi";
import { Controller, useForm } from "react-hook-form";
import { validation } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { DropDownOptions } from "devextreme-react/lookup";
import DataSource from "devextreme/data/data_source";
import { ItemClickEvent } from "devextreme/ui/lookup";
import { IUserAccount, userAccount } from "../api/authApi";
import { Button } from "devextreme-react/button";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { CustomDialogOptions, confirm, custom } from "devextreme/ui/dialog";
import notify from "devextreme/ui/notify";
import { ClickEvent } from "devextreme/ui/button";
import { AxiosError, AxiosPromise } from "axios";

interface IRoll {
  seq: number;
  roll: string;
}

interface IPosition {
  seq: number;
  postion: string;
}

interface IDataSource {
  store: IRoll;
  key: string;
  group: string;
}

interface IUserAccout {
  userId: string;
  password: string;
  pwCheck?: string;
  email: string;
  tel: string;
  phone: string;
  roll: string;
  position: string;
  bigo: string;
}

export default function CreateAccountUseForm() {
  const [isLoading, setLoading] = useState(false);
  const [popUp, setPopup] = useState<boolean>(false);

  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState, control, trigger } =
    useForm({
      resolver: yupResolver(validation),
    });

  const { data } = useQuery<IRoll[]>("roll", () => rollData(), {
    refetchInterval: false,
  });
  const { data: position } = useQuery<IPosition[]>(
    "position",
    () => userPosition(),
    {
      refetchInterval: false,
    }
  );

  const { mutate, error } = useMutation(
    async (newUser: IUserAccount) => {
      userAccount("/createaccount", newUser);
    },
    {
      onSuccess: () => {
        notify(
          {
            message: "사용자 등록",
            width: 300,
            shading: true,
            type: "success",
            displayTime: 300,
          },
          { position: "center", direction: "up-push" }
        );
        navigate("/login");
      },
      onError: (error, variables, context) => {
        notify(
          {
            message: error,
            width: 300,
            shading: true,
            type: "error",
            displayTime: 300,
          },
          { position: "center", direction: "up-push" }
        );
      },
    }
  );

  const groupData = new DataSource<IDataSource>({
    store: data,
    key: "seq",
    group: "roll",
  });

  const positionGroup = new DataSource<IDataSource>({
    store: position,
    key: "seq",
    group: "position",
  });

  const groupedLookupLabel = { "aria-label": "Groupe" };
  const positionLabel = { "aria-label": "Position" };

  const myDialog = custom({
    title: "사용자 등록",
    messageHtml: "<b>입력하신 정보로 사용자를 등록하시겠습니까?</b>",
    buttons: [
      {
        text: "확인",
        onClick: (e: ClickEvent) => {
          return { buttonText: e.component.option("text") };
        },
      },
      {
        text: "취소",
        onClick: (e: ClickEvent) => {
          return { buttonText: e.component.option("text") };
        },
      },
    ],
  });

  const onClickJoin = async (data: IUserAccout) => {
    if (
      data.userId === "" ||
      data.password === "" ||
      data.email === "" ||
      data.roll === ""
    ) {
      return;
    } else {
      const body = {
        userId: data.userId,
        password: data.password,
        email: data.email,
        group: data.roll,
        spot: data.position,
        tel: data.tel,
        phone: data.phone,
        bigo: data.bigo,
      };

      myDialog.show().then((dialogResult: { buttonText: string }) => {
        dialogResult.buttonText === "확인"
          ? mutate(body)
          : notify(
              {
                message: "사용자 등록취소",
                width: 300,
                shading: true,
                type: "warning",
                displayTime: 300,
              },
              { position: "center", direction: "up-push" }
            );
      });
    }
  };

  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={handleSubmit(onClickJoin)}>
        <Input placeholder="userId" {...register("userId")} />
        {formState.errors.userId?.message && (
          <ErrorElement>
            <ErrorP error={formState.errors.userId?.message}>
              {formState.errors.userId?.message}
            </ErrorP>
          </ErrorElement>
        )}
        <Input placeholder="password" {...register("password")} />
        {formState.errors.password?.message && (
          <ErrorElement>
            <ErrorP error={formState.errors.password?.message}>
              {formState.errors.password?.message}
            </ErrorP>
          </ErrorElement>
        )}
        <Input placeholder="pwCheck" {...register("pwCheck")} />
        {formState.errors.pwCheck?.message && (
          <ErrorElement>
            <ErrorP error={formState.errors.pwCheck?.message}>
              {formState.errors.pwCheck?.message}
            </ErrorP>
          </ErrorElement>
        )}
        <Input placeholder="email" {...register("email")} />
        {formState.errors.email?.message && (
          <ErrorElement>
            <ErrorP error={formState.errors.email?.message}>
              {formState.errors.email?.message}
            </ErrorP>
          </ErrorElement>
        )}
        <Input placeholder="tel" {...register("tel")} />
        {formState.errors.tel?.message && (
          <ErrorElement>
            <ErrorP error={formState.errors.tel?.message}>
              {formState.errors.tel?.message}
            </ErrorP>
          </ErrorElement>
        )}
        <Input placeholder="phone" {...register("phone")} />
        {formState.errors.phone?.message && (
          <ErrorElement>
            <ErrorP error={formState.errors.phone?.message}>
              {formState.errors.phone?.message}
            </ErrorP>
          </ErrorElement>
        )}
        <Input placeholder="bigo" {...register("bigo")} />
        {formState.errors.bigo?.message && (
          <ErrorElement>
            <ErrorP error={formState.errors.bigo?.message}>
              {formState.errors.bigo?.message}
            </ErrorP>
          </ErrorElement>
        )}

        <Controller
          name="position"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <LookUpSelect
              dataSource={positionGroup}
              grouped={true}
              displayExpr="position"
              inputAttr={positionLabel}
              style={{ borderRadius: "50px" }}
              onItemClick={(e: ItemClickEvent) => {
                setValue("position", e.itemData.position);
                trigger("position");
              }}
            >
              <DropDownOptions
                hideOnOutsideClick={true}
                showTitle={true}
                titleTemplate={"position"}
              />
            </LookUpSelect>
          )}
        />
        <Controller
          name="roll"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <LookUpSelect
              dataSource={groupData}
              grouped={true}
              displayExpr="roll"
              inputAttr={groupedLookupLabel}
              style={{ borderRadius: "50px" }}
              onItemClick={(e: ItemClickEvent) => {
                setValue("roll", e.itemData.roll);
                trigger("roll");
              }}
            >
              <DropDownOptions
                hideOnOutsideClick={true}
                showTitle={true}
                titleTemplate={"roll"}
              />
            </LookUpSelect>
          )}
        />

        {formState.errors.roll && (
          <ErrorElement>
            <ErrorP error={formState.errors.roll?.message}>
              {formState.errors.roll?.message}
            </ErrorP>
          </ErrorElement>
        )}
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {/* <Popup
        visible={popUp}
        onHiding={() => togglePopup}
        dragEnabled={false}
        hideOnOutsideClick={false}
        showCloseButton={false}
        showTitle={true}
        width={300}
        height={280}
        title="회원정보"
      >
        <Position at="center" my="bottom" of={""} collision="fit" />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={closeButtonOptions}
        />
      </Popup> */}

      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
