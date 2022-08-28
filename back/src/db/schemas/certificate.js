import { Schema, model } from "mongoose";
import { stringify } from "uuid";

const CertificateSchema = new Schema(
  {
    // User 식별 id
    userId: {
      type: Number,
      required: true,
    },
    // 자격증 명칭
    title: {
      type: String,
      required: true,
    },
    // 발급일
    date: {
      type: Date,
      required: true,
    },
    // 발급기관
    org: {
      type: String,
      required: true,
    },
    // 설명
    description: {
      type: String,
    },
    // certId : 자격증 추가 시 프론트에서 넘겨주는 해당 certificate의 고유id
    certId : {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };