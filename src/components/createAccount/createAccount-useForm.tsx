import { useState } from "react";
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
import { SelectChangeEvent } from "@mui/material/Select";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DropDownOptions } from "devextreme-react/lookup";
import DataSource from "devextreme/data/data_source";
import { ItemClickEvent } from "devextreme/ui/lookup";
import React from "react";
import axios from "axios";
import { BASE_URL } from "../api/authApi";
import { useDispatch } from "react-redux";
import { createAccount } from "../api/userLogin";
import { AppThunkDispatch } from "../store/store";

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
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState, control, trigger } =
    useForm({
      resolver: yupResolver(validation),
      mode: "onChange",
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

  const dispatch = useDispatch<AppThunkDispatch>();

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
      dispatch(createAccount(body));
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
        <Input placeholder="tell" {...register("tel")} />
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

      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}

///////////////////
{
  /* <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Roll</InputLabel>
            <Controller
              name="roll"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="roll"
                  style={{ backgroundColor: "#FFFFFF", borderRadius: "50px" }}
                >
                  {data?.map((el) => (
                    <MenuItem key={el.seq} value={el.roll}>
                      {el.roll}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <ErrorElement>
            <ErrorP error={formState.errors.roll?.message}>
              {formState.errors.roll?.message}
            </ErrorP>
          </ErrorElement>
        </Box> */
}
