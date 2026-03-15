"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

export type TestimonialItem = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export function TestimonialsColumn(props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
  cardClassName?: string;
}) {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 12,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <article
                className={`w-full max-w-xs rounded-3xl border border-[#49413f26] bg-white/92 p-6 shadow-[0_18px_44px_rgba(73,65,63,0.14)] ${props.cardClassName ?? ""}`}
                key={`${name}-${role}-${i}`}
              >
                <p className="text-[0.96rem] font-medium leading-7 text-[#5c5351]">
                  {text}
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <Image
                    width={44}
                    height={44}
                    src={image}
                    alt={name}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-[0.9rem] font-semibold leading-5 tracking-tight text-[#49413f]">
                      {name}
                    </p>
                    <p className="text-[0.78rem] font-medium leading-5 tracking-tight text-[#7a706d]">
                      {role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
