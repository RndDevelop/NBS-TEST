import * as yup from "yup";

export const validation = yup.object({
  userId: yup.string().required("이름을 입력해주세요"),
  roll: yup.string().required("권한을 입력해주세요"),
  position: yup.string().required("직급을 선택해주세요"),

  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
      "영문, 숫자, 특수문자를 포함한 8자리~16자리 여야합니다."
    )
    .required("비밀번호는 필수 입력 사항입니다"),
  email: yup
    .string()
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
      "이메일 형식이 적합하지 않습니다"
    )
    .required("이메일은 필수입력사항 입니다"),
  bigo: yup
    .string()
    .max(20, "비고는 20자 이내입니다")
    .required("필수입력 조건입니다."),

  tel: yup
    .string()
    .max(11, "닉네임은 11자 이내입니다")
    .required("전화번호는 필수입니다."),
  phone: yup
    .string()
    .max(11, "닉네임은 11자 이내입니다")
    .required("전화번호는 필수입니다."),
  pwCheck: yup
    .string()
    .oneOf([yup.ref("password"), ""], "비밀번호가 일치하지 않습니다")
    .required("비밀번호를 확인해주세요."),
});

export const validationUpdate = yup.object({
  userId: yup.string().required("이름을 입력해주세요"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
      "영문, 숫자, 특수문자를 포함한 8자리~16자리 여야합니다."
    )
    .required("비밀번호는 필수 입력 사항입니다"),
  email: yup
    .string()
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
      "이메일 형식이 적합하지 않습니다"
    )
    .required("이메일은 필수입력사항 입니다"),
  roll: yup.string().required("권한을 입력해주세요"),
  tell: yup
    .string()
    .max(11, "닉네임은 11자 이내입니다")
    .required("전화번호는 필수입니다."),

  phone: yup
    .string()
    .max(11, "닉네임은 11자 이내입니다")
    .required("전화번호는 필수입니다."),
  position: yup.string().required("직급을 선택해주세요"),

  bigo: yup.string().max(20, "비고는 20자 이내입니다"),
});
