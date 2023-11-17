import { useQuery } from "react-query";
import { userProfile } from "../api/authApi";
import "devextreme-react/text-area";
import { rollData, userPosition } from "../api/rollApi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { custom } from "devextreme/ui/dialog";
import { ClickEvent } from "devextreme/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationUpdate } from "../createAccount/validation";
import React, { useEffect, useRef, useState } from "react";
import { getValue } from "@testing-library/user-event/dist/utils";
import notify from "devextreme/ui/notify";
import { useDispatch } from "react-redux";
import userUpdate, { IUserUpdate, setUpdaetUser } from "../store/userUpdate";
import { AppThunkDispatch } from "../store/store";
import { profileUpdate } from "../api/userLogin";

interface IUsetSet {
  BIGO: string;
  DEL_YN: string;
  MODIFIER: string;
  MODIFIER_TIME: string;
  REGISTRANT: string;
  REGIST_TIME: string;
  USER_EMAIL: string;
  USER_GROUP: string;
  USER_ID: string;
  USER_PHONE: string;
  USER_PW: string;
  USER_SPOT: string;
  USER_TELL: string;
  USER_YN: string;
  seq: string;
}

interface IPosition {
  seq: number;
  position: string;
}

interface IRoll {
  seq: number;
  roll: string;
}

export default function Profile() {
  //리엑트  쿼리 // 캐싱된 데이터 이기 때문에 캐싱된 데이터 활용 가능
  // const userId = useAppSelector((state) => state.login.persons.userId);
  const [userInfoCopy, setUserInforCopy] = useState<IUsetSet>();
  const dispatch = useDispatch<AppThunkDispatch>();
  const { data: userInfo, isLoading } = useQuery<IUsetSet>(
    "userInfo",
    () => userProfile(),
    {
      refetchInterval: false,
    }
  );

  useEffect(() => {
    if (userInfo) {
      setValue("userId", userInfo.USER_ID);
      setValue("password", userInfo.USER_PW);
      setValue("email", userInfo.USER_EMAIL);
      setValue("tell", userInfo.USER_TELL);
      setValue("phone", userInfo.USER_PHONE);
      setValue("bigo", userInfo.BIGO);
      setValue("position", userInfo.USER_SPOT);
      setValue("roll", userInfo.USER_GROUP);
    }
  }, [isLoading]);

  const { register, handleSubmit, setValue, formState, control, trigger } =
    useForm({
      resolver: yupResolver(validationUpdate),
      defaultValues: {
        userId: userInfo?.USER_ID,
        password: userInfo?.USER_PW,
        email: userInfo?.USER_EMAIL,
        tell: userInfo?.USER_TELL,
        phone: userInfo?.USER_PHONE,
        position: userInfo?.USER_SPOT,
        roll: userInfo?.USER_GROUP,
        bigo: userInfo?.BIGO,
      },
    });

  const { data: position } = useQuery<IPosition[]>(
    "position",
    () => userPosition(),
    {
      refetchInterval: false,
    }
  );
  const { data: roll } = useQuery<IRoll[]>("roll", () => rollData(), {
    refetchInterval: false,
  });

  const myDialog = custom({
    title: "사용자 등록",
    messageHtml: "<b>입력하신 정보로 사용자를 등록하시겠습니까?</b>",
    buttons: [
      {
        text: "저장",
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

  const onClickJoin = async (data: IUserUpdate) => {
    if (
      data.userId === "" ||
      data.password === "" ||
      data.phone === "" ||
      data.position === ""
    ) {
      return;
    } else {
      const bodey = {
        bigo: data.bigo,
        email: data.email,
        password: data.password,
        phone: data.phone,
        position: data.position,
        tell: data.tell,
        roll: data.roll,
        userId: data.userId,
      };
      myDialog.show().then((dialogResult: { buttonText: string }) => {
        dialogResult.buttonText === "저장"
          ? dispatch(profileUpdate(bodey))
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

  // const onClickUpdate = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(e.currentTarget);
  // };
  // const onHandleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const {
  //     target: { name, value },
  //   } = event;

  //   console.log(name, value);
  // };

  return (
    <div>
      <Form onSubmit={handleSubmit(onClickJoin)}>
        <Form.Group className="mb-3" controlId="userId">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="userId"
            defaultValue={userInfo?.USER_ID}
            {...register("userId")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            defaultValue={userInfo?.USER_PW}
            {...register("password")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            defaultValue={userInfo?.USER_EMAIL}
            {...register("email")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="tell">
          <Form.Label>Tell</Form.Label>
          <Form.Control
            type="tell"
            placeholder="tell"
            defaultValue={userInfo?.USER_TELL}
            {...register("tell")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="phone"
            placeholder="Phone"
            defaultValue={userInfo?.USER_PHONE}
            {...register("phone")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="bigo">
          <Form.Label>비고</Form.Label>
          <Form.Control
            type="bigo"
            placeholder="bigo"
            defaultValue={userInfo?.BIGO}
            {...register("bigo")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="position">
          <Form.Label>직급</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register("position")}
          >
            <option value={userInfo?.USER_SPOT}>{userInfo?.USER_SPOT}</option>
            {roll?.map((roll) => (
              <option value={roll.roll} key={roll.seq}>
                {roll.roll}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="roll">
          <Form.Label>권한그룹</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register("roll")}
          >
            <option value={userInfo?.USER_GROUP}>{userInfo?.USER_GROUP}</option>
            {position?.map((position) => (
              <option value={position.position} key={position.seq}>
                {position.position}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit">저장</Button>
      </Form>
    </div>
  );
}

// const userIdOption = {
//   width: "100%",
//   style: { color: "#EFFBEF" },
//   disabled: true,
// };
// const userEmailOption = { width: "100%" };

// const stateOptions = {
//   items: position?.map((el) => {
//     return el.position;
//   }),
//   value: userInfo.data?.USER_SPOT,
//   searchEnabled: true,
// };

// const rollOptions = {
//   items: roll?.map((el) => {
//     return el.roll;
//   }),
//   value: userInfo.data?.USER_GROUP,
//   searchEnabled: true,
// };

// const phoneOptions = { mask: "+1 (000) 000-0000" };
// const avatarRender = () => <div className="form-avatar"></div>;

// const validateForm = React.useCallback((e: ContentReadyEvent) => {
//   e.component.validate();
//   console.log(e.component.validate().validators?.values());
// }, []);

{
  /* <Form formData={userInfo.data}>
<SimpleItem render={avatarRender}></SimpleItem>

<SimpleItem dataField={"USER_ID"} editorOptions={userIdOption} />
<SimpleItem dataField={"USER_EMAIL"} editorOptions={userEmailOption} />

<SimpleItem
  dataField="position"
  editorType="dxSelectBox"
  editorOptions={{ ...stateOptions }}
/>
<SimpleItem
  dataField="USER_GROUP"
  editorType="dxSelectBox"
  editorOptions={{ ...rollOptions }}
/>

<SimpleItem dataField="USER_PHONE" editorOptions={{ width: "100%" }} />

<SimpleItem
  dataField="USER_TELL"
  // editorType="dxDateBox"
  editorOptions={phoneOptions}
/>

<TextBox name="Password" mode="password">
  <Validator>
    <RequiredRule />
  </Validator>
</TextBox>

<SimpleItem
  dataField="BIGO"
  // editorType="dxDateBox"
  editorOptions={{ width: "100%" }}
/>
<Button text="Submit" type="success" useSubmitBehavior={true} />
</Form> */
}
