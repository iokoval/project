import React from 'react';
import '../App.css';

export class MainPage extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="media col-sm-2 col-md-3">
                        <div className="pull-left">
                            <div className="media-object">
                                <img src="https://printelit.ru/content/images/new-elements/advantage/pay.png" alt="Расчет по карте" />
                            </div>
                        </div>
                        <div className="media-body">
                            <p>Наличный и безналичный расчет по карте</p>
                        </div>
                    </div>
                    <div className="media col-sm-2 col-md-3">
                        <div className="pull-left">
                            <div className="media-object">
                                <img src="https://printelit.ru/content/images/new-elements/advantage/post.png" alt="Доставка транспортной компанией" />
                            </div>
                        </div>
                        <div className="media-body">
                            <p>Доставка транспортной компанией по всей Украине</p>
                        </div>
                    </div>
                    <div className="media col-sm-2 col-md-3">
                        <div className="pull-left">
                            <div className="media-object">
                                <img src="https://printelit.ru/content/images/new-elements/advantage/prs.png" alt="Собственное производство полиграфии" />
                            </div>
                        </div>
                        <div className="media-body">
                            <p>Собственное производство</p>
                        </div>
                    </div>
                    <div className="media col-sm-2 col-md-3">
                        <div className="pull-left">
                            <div className="media-object">
                                <img src="https://printelit.ru/content/images/new-elements/advantage/online.png" alt="Оформление заказов онлайн типографии" />
                            </div>
                        </div>
                        <div className="media-body">
                            <p>Срочная печать за 1 день</p>
                        </div>
                    </div>
                </div>
                <div id="portfolio">
                    <h1>Каталог товаров и распродажа!</h1>
                    <div id="portfolioContent">
                        <div id="content">
                            <figure className="figure">
                                <img src="imgs\New folder\cup.jpg" alt="" />
                                <figcaption>
                                    <h2>Кружки</h2>
                                </figcaption>
                            </figure>
                        </div>
                        <div id="content">
                            <figure className="figure">
                                <img src="imgs/New folder/t-shirt.jpg" alt="" />
                                <figcaption>
                                    <h2>Футболки</h2>
                                </figcaption>
                            </figure>
                        </div>
                        <div id="content">
                            <figure className="figure">
                                <img src="imgs/New folder/img3.jpg" alt="" />
                                <figcaption>
                                    <h2>Сувениры</h2>
                                </figcaption>
                            </figure>
                        </div>
                        <div id="content">
                            <figure className="figure">
                                <img src="imgs/New folder/create.jpg" alt="" />
                                <figcaption>
                                    <h2>Конструктор</h2>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
