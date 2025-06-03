'use client'

import React from 'react'
import Header from '../../components/HeaderDetails'

export default function QuemSomosPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10 mt-10 text-gray-800 min-h-[705px] bg-[white] rounded-[5px]">
        <h1 className="text-3xl font-bold text-center text-[#17686f] mb-8">
          Quem Somos
        </h1>
        <div className="space-y-6 text-center text-[22px] leading-[1.6]">
          <p>
            Na <strong>AuChic</strong>, acreditamos que estilo não é exclusividade dos humanos.
            Fundada por apaixonados por pets e por moda (sim, essa mistura existe),
            a Auchiq nasceu para transformar o guarda-roupa dos cachorros em algo digno
            de passarela ou pelo menos digno daquele passeio no parque.
          </p>
          <p>
            Nosso compromisso é com o conforto, a personalidade e, claro, aquele toque de
            charme que faz qualquer pet virar o centro das atenções. Cada peça é pensada
            para unir design, funcionalidade e o tipo de fofura que derrete até o mais
            ranzinza dos corações.
          </p>
          <p>
            Seja para os dias de frio, para um evento pet-chique ou só porque seu dog
            merece se sentir incrível, estamos aqui pra vestir seu melhor amigo com estilo.
            Porque no fundo, todo cachorro já é maravilhoso a roupa é só a cereja no biscoito.
          </p>
        </div>
      </main>
    </>
  )
}
